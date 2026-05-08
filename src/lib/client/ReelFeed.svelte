<script lang="ts">
import ReelCard from "$lib/client/ReelCard.svelte";
import {
	type LoopedReel,
	buildLoopedFeedItems,
	virtualizeReels,
} from "$lib/client/reelFeed";
import type { Fact, ReelFeedItem } from "$lib/types";
import { Sparkles } from "lucide-svelte";

type Props = {
	facts: Fact[];
	feedItems: ReelFeedItem[];
};

const { facts, feedItems }: Props = $props();

let selectedAnswers = $state<Record<string, number | undefined>>({});
let activeReelIndex = $state(0);
let scrollDirection = $state<"up" | "down">("down");
let isPaused = $state<Record<string, boolean>>({});
let swipeOffset = $state(0);

let feedEl: HTMLElement | undefined = $state();
const videoRefs: Record<string, HTMLVideoElement> = {};
const reelElements: Record<string, HTMLElement> = {};
let observer: IntersectionObserver | undefined;
let lastActiveIndex = 0;
let touchStartY = 0;

const totalFacts = $derived(facts.length);
const highRiskCount = $derived(
	facts.filter((fact) => fact.riskLevel === "high").length,
);
const loopedFeedItems = $derived(buildLoopedFeedItems(feedItems));
const virtualItems = $derived(
	virtualizeReels(loopedFeedItems, activeReelIndex, scrollDirection),
);

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
	for (const entry of entries) {
		const key = entry.target.getAttribute("data-reel-key");
		if (!key) continue;
		const index = loopedFeedItems.findIndex((reel) => reel.key === key);
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
	playVideo(key);
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
	const safeIndex = Math.max(0, Math.min(index, loopedFeedItems.length - 1));
	const key = loopedFeedItems[safeIndex]?.key;
	if (!key) return;
	const el = reelElements[key];
	if (el) el.scrollIntoView({ behavior: "smooth" });
}

function skipToNext() {
	const nextIdx = activeReelIndex + 1;
	const safeNext = nextIdx >= loopedFeedItems.length ? 0 : nextIdx;
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
			scrollToReel(Math.min(activeReelIndex + 1, loopedFeedItems.length - 1));
			break;
		case "ArrowUp":
		case "k":
			e.preventDefault();
			scrollToReel(Math.max(activeReelIndex - 1, 0));
			break;
		case " ":
			e.preventDefault();
			togglePause(loopedFeedItems[activeReelIndex]?.key ?? "");
			break;
		case "Home":
			e.preventDefault();
			scrollToReel(0);
			break;
		case "End":
			e.preventDefault();
			scrollToReel(loopedFeedItems.length - 1);
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
	selectedAnswers[answerKey] = optionIndex;
}

function bindVideo(node: HTMLVideoElement, key: string) {
	videoRefs[key] = node;
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

function displayCounter(loopedReels: LoopedReel[]) {
	const current = loopedReels[activeReelIndex];
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
			<span class="mono">Video {displayCounter(loopedFeedItems)}</span>
		</div>
	</header>

	<section
		class="feed"
		bind:this={feedEl}
		aria-label="Feed de reels estilo Instagram"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
	>
		{#each virtualItems as reel (reel.key)}
			<ReelCard
				{reel}
				selectedAnswer={selectedAnswers[reel.key]}
				isPaused={isPaused[reel.key] ?? false}
				{swipeOffset}
				onAnswerQuiz={answerQuiz}
				onTogglePause={togglePause}
				onNextReel={skipToNext}
				onBindReel={bindReel}
				onBindVideo={bindVideo}
			/>
		{/each}
	</section>

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
</main>

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
	}

	.feed::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 900px) {
		.topbar {
			position: sticky;
		}

		nav {
			display: none;
		}

		.feed {
			height: auto;
			overflow: visible;
			scroll-snap-type: none;
		}

		.dot-nav {
			display: none;
		}
	}

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
</style>
