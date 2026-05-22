<script lang="ts">
import {
	type LoopedReel,
	type ReelPage,
	buildInfoItems,
	buildLoopedFeedItems,
	buildReelPages,
	virtualizePages,
	virtualizeReels,
} from "$lib/client/reelFeed";
import {
	type ReviewMap,
	loadReviewState,
	pickNextQuizFactId,
	recordAnswer,
	saveReviewState,
} from "$lib/client/spacedRepetition";
import type { Fact, ReelFeedItem } from "$lib/types";
import { Sparkles } from "lucide-svelte";
import InfoOverlay from "./InfoOverlay.svelte";
import ReelCard from "./ReelCard.svelte";

type Props = {
	facts: Fact[];
	feedItems: ReelFeedItem[];
};

let { facts, feedItems }: Props = $props();

let selectedAnswers = $state<Record<string, number | undefined>>({});
let activeReelIndex = $state(0);
let scrollDirection = $state<"up" | "down">("down");
let isPaused = $state<Record<string, boolean>>({});
let hasInteracted = $state(false);
let swipeOffset = $state(0);
let openInfoKey = $state<string | null>(null);

let feedEl: HTMLElement | undefined = $state();
const videoRefs: Record<string, HTMLVideoElement> = {};
const reelElements: Record<string, HTMLElement> = {};
let observer: IntersectionObserver | undefined;
let lastActiveIndex = 0;
let touchStartY = 0;
let isMobile = $state(false);

const totalFacts = $derived(facts.length);
const highRiskCount = $derived(
	facts.filter((fact) => fact.riskLevel === "high").length,
);
const factMap = $derived(Object.fromEntries(facts.map((f) => [f.id, f])));

let reviewState = $state<ReviewMap>({});

const itemByFactId = $derived(
	Object.fromEntries(feedItems.map((f) => [f.factId, f])),
);

const loopedFeedItems = $derived(buildLoopedFeedItems(feedItems));
const mobilePages = $derived(
	buildReelPages(feedItems, 1, {
		quizPicker: (_pos, seenFactIds) => {
			const id = pickNextQuizFactId(seenFactIds, reviewState);
			return id ? (itemByFactId[id] ?? null) : null;
		},
	}),
);

function handleQuizAnswered(factId: string, optionIndex: number) {
	const item = itemByFactId[factId];
	if (!item) return;
	const correct = optionIndex === item.quiz.answerIndex ? 1 : 0;
	reviewState = recordAnswer(reviewState, factId, correct);
	saveReviewState(reviewState);
}

$effect(() => {
	reviewState = loadReviewState();
});
const activePageType = $derived(
	mobilePages[activeReelIndex]?.pageType ?? "video",
);

const virtualItems = $derived(
	virtualizeReels(loopedFeedItems, activeReelIndex, scrollDirection),
);
const virtualPages = $derived(
	virtualizePages(mobilePages, activeReelIndex, scrollDirection),
);

const openInfoItems = $derived.by(() => {
	if (!openInfoKey) return [];
	const page = mobilePages.find((p) => p.key === openInfoKey);
	if (!page) return [];
	return buildInfoItems(page.item, factMap[page.item.factId]);
});

$effect(() => {
	const mq = matchMedia("(max-width: 900px)");
	isMobile = mq.matches;
	const handler = () => {
		isMobile = mq.matches;
	};
	mq.addEventListener("change", handler);
	return () => mq.removeEventListener("change", handler);
});

$effect(() => {
	if (!feedEl) return;
	observer = new IntersectionObserver(handleIntersection, {
		root: feedEl,
		threshold: [0.6],
	});
	for (const key of Object.keys(reelElements)) {
		const el = reelElements[key];
		if (el) observer.observe(el);
	}
	return () => observer?.disconnect();
});

function handleIntersection(entries: IntersectionObserverEntry[]) {
	const items = isMobile ? mobilePages : loopedFeedItems;
	for (const entry of entries) {
		const key = entry.target.getAttribute("data-reel-key");
		if (!key) continue;
		const index = items.findIndex((reel) => reel.key === key);
		if (index === -1) continue;
		if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
			activateReel(key, index);
		} else {
			pauseVideo(key);
		}
	}
}

function activateReel(key: string, index: number) {
	if (index !== lastActiveIndex) {
		scrollDirection = index > lastActiveIndex ? "down" : "up";
	}
	activeReelIndex = index;
	lastActiveIndex = index;
	if (!isMobile) {
		playVideo(key);
		return;
	}
	const page = mobilePages[index];
	if (page?.pageType === "video") playVideo(key);
}

function playVideo(key: string) {
	const video = videoRefs[key];
	if (!video || isPaused[key]) return;
	video.play().catch(() => {});
}

function pauseVideo(key: string) {
	const video = videoRefs[key];
	if (!video) return;
	video.pause();
}

function togglePause(key: string) {
	const video = videoRefs[key];
	if (!video) return;
	if (video.paused) {
		isPaused[key] = false;
		video.play().catch(() => {});
	} else {
		isPaused[key] = true;
		video.pause();
	}
}

function scrollToReel(index: number) {
	const items = isMobile ? mobilePages : loopedFeedItems;
	const safeIndex = Math.max(0, Math.min(index, items.length - 1));
	const key = items[safeIndex]?.key;
	if (!key) return;
	const el = reelElements[key];
	if (el) el.scrollIntoView({ behavior: "smooth" });
}

function skipToNext() {
	const items = isMobile ? mobilePages : loopedFeedItems;
	const nextIdx = activeReelIndex + 1;
	const safeNext = nextIdx >= items.length ? 0 : nextIdx;
	scrollToReel(safeNext);
}

function handleKeydown(e: KeyboardEvent) {
	if (e.target instanceof HTMLButtonElement) return;
	if (e.target instanceof HTMLInputElement) return;
	switch (e.key) {
		case "ArrowDown":
		case "j":
		case "n":
			e.preventDefault();
			skipToNext();
			break;
		case "ArrowUp":
		case "k":
			e.preventDefault();
			scrollToReel(activeReelIndex - 1);
			break;
		case " ":
			e.preventDefault();
			togglePause(
				(isMobile ? mobilePages : loopedFeedItems)[activeReelIndex]?.key ?? "",
			);
			break;
		case "Home":
			e.preventDefault();
			scrollToReel(0);
			break;
		case "End":
			e.preventDefault();
			scrollToReel((isMobile ? mobilePages : loopedFeedItems).length - 1);
			break;
	}
}

function handleTouchStart(e: TouchEvent) {
	touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e: TouchEvent) {
	const delta = e.touches[0].clientY - touchStartY;
	swipeOffset = Math.max(-60, Math.min(60, delta));
}

function handleTouchEnd() {
	swipeOffset = 0;
}

function answerQuiz(answerKey: string, optionIndex: number) {
	if (selectedAnswers[answerKey] !== undefined) return;
	selectedAnswers[answerKey] = optionIndex;
	const page = mobilePages.find((p) => p.key === answerKey);
	if (page?.pageType === "quiz") {
		handleQuizAnswered(page.item.factId, optionIndex);
	}
}

function bindVideo(node: HTMLVideoElement, key: string) {
	videoRefs[key] = node;
	if (hasInteracted && node.muted) {
		node.muted = false;
	}
	return {
		destroy() {
			delete videoRefs[key];
		},
	};
}

function bindReel(node: HTMLElement, key: string) {
	reelElements[key] = node;
	if (observer) observer.observe(node);
	return {
		destroy() {
			observer?.unobserve(node);
			delete reelElements[key];
		},
	};
}

function displayCounter(items: (LoopedReel | ReelPage)[]) {
	const current = items[activeReelIndex];
	if (!current) return "0/0";
	return `${current.reelNumber}/${feedItems.length}`;
}
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="feed-shell">
	<header class="topbar">
		<a class="brand" href="#reel-0" aria-label="ObstetraScroll Start">
			<span class="brand-mark"><Sparkles size={18} /></span>
			<span>
				<strong>ObstetraScroll</strong>
				<small>Feed de reels AIServices</small>
			</span>
		</a>

		<nav aria-label="Estado del feed">
			<span><strong>{feedItems.length}</strong> videos base</span>
			<span><strong>{totalFacts}</strong> datos</span>
			<span><strong>{highRiskCount}</strong> a revisar</span>
		</nav>

		<div class="reel-counter">
			<span class="mono">Video {displayCounter(isMobile ? mobilePages : loopedFeedItems)}</span>
		</div>
	</header>

	<section
		class="feed"
		class:mobile={isMobile}
		bind:this={feedEl}
		aria-label="Feed de reels estilo Instagram"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
	>
		{#if isMobile}
			{#each virtualPages as page (page.key)}
			<ReelCard
				reel={page}
				pageType={page.pageType}
				{hasInteracted}
				selectedAnswer={selectedAnswers[page.key]}
				isPaused={isPaused[page.key] ?? false}
				{swipeOffset}
				onAnswerQuiz={answerQuiz}
				onTogglePause={togglePause}
				onNextReel={skipToNext}
				onBindReel={bindReel}
				onBindVideo={bindVideo}
				onInfoOpen={(key) => {
					openInfoKey = key;
				}}
				onFirstInteraction={() => { hasInteracted = true; }}
			/>
		{/each}
		{:else}
			{#each virtualItems as reel (reel.key)}
				<ReelCard
					{reel}
					{hasInteracted}
					selectedAnswer={selectedAnswers[reel.key]}
					isPaused={isPaused[reel.key] ?? false}
					{swipeOffset}
					onAnswerQuiz={answerQuiz}
					onTogglePause={togglePause}
					onNextReel={skipToNext}
					onBindReel={bindReel}
					onBindVideo={bindVideo}
					onFirstInteraction={() => { hasInteracted = true; }}
				/>
			{/each}
		{/if}
	</section>

	{#if isMobile}
		<nav class="dot-nav" aria-label="Navegación de reels">
			{#each feedItems as _, i}
				{@const activeBase = Math.floor(activeReelIndex / 2)}
				<button
					type="button"
					class:active={i === activeBase % feedItems.length}
					aria-label={`Video ${i + 1}`}
					onclick={() => {
						const targetIdx = i * 2;
						scrollToReel(targetIdx);
					}}
				></button>
			{/each}
		</nav>
	{:else}
		<nav class="dot-nav" aria-label="Navegación de reels">
			{#each feedItems as _, i}
				{@const activeLoopIdx = activeReelIndex % feedItems.length}
				<button
					type="button"
					class:active={i === activeLoopIdx}
					aria-label={`Video ${i + 1}`}
					onclick={() => {
						const targetIdx = Math.floor(activeReelIndex / feedItems.length) * feedItems.length + i;
						scrollToReel(targetIdx);
					}}
				></button>
			{/each}
		</nav>
	{/if}
</main>

<InfoOverlay
	items={openInfoItems}
	open={openInfoKey !== null}
	onClose={() => {
		openInfoKey = null;
	}}
/>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	.feed-shell {
		min-height: 100vh;
		background:
			linear-gradient(90deg, rgb(21 21 21 / 4%) 1px, transparent 1px) 0 0 / 48px
			48px,
			linear-gradient(180deg, rgb(21 21 21 / 3%) 1px, transparent 1px) 0 0 / 48px
			48px,
			var(--paper);
	}

	.topbar {
		position: fixed;
		z-index: 10;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 18px;
		border-bottom: 1px solid rgb(21 21 21 / 18%);
		background: rgb(247 244 237 / 86%);
		backdrop-filter: blur(16px);
	}

	.brand {
		display: inline-flex;
		gap: 12px;
		align-items: center;
		color: var(--ink);
		text-decoration: none;
	}

	.brand-mark {
		display: grid;
		width: 38px;
		height: 38px;
		place-items: center;
		border: 1px solid var(--ink);
		background: var(--yellow);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.brand strong,
	.brand small {
		display: block;
	}

	.brand small,
	nav,
	.mono {
		font-family: var(--font-mono);
	}

	.brand small {
		color: var(--muted);
		font-size: 0.72rem;
	}

	nav {
		display: flex;
		gap: 8px;
		align-items: center;
		font-size: 0.78rem;
	}

	nav span {
		padding: 8px 10px;
		border: 1px solid var(--ink);
		background: #fffdf8;
	}

	.reel-counter {
		padding: 6px 10px;
		border: 1px solid var(--ink);
		background: var(--yellow);
		font-size: 0.78rem;
	}

	.feed {
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		scroll-snap-type: y mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		touch-action: pan-y;
	}

	.feed::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 900px) {
		.topbar {
			display: none;
		}

		.feed.mobile {
			height: 100dvh;
			scroll-snap-type: y mandatory;
			-webkit-overflow-scrolling: touch;
		}

		.dot-nav {
			display: none;
		}
	}

	@media (min-width: 901px) {
		.dot-nav {
			position: fixed;
			right: 16px;
			top: 50%;
			transform: translateY(-50%);
			z-index: 9;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.dot-nav button {
			width: 10px;
			height: 10px;
			padding: 0;
			border: 1px solid var(--ink);
			border-radius: 50%;
			background: #fffdf8;
			cursor: pointer;
			transition: background 0.15s, transform 0.15s;
		}

		.dot-nav button.active {
			background: var(--yellow);
			transform: scale(1.35);
		}

		.dot-nav button:hover {
			background: var(--yellow);
		}
	}
</style>
