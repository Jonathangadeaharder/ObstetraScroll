<script lang="ts">
import type { VirtualReel } from "$lib/client/reelFeed";
import {
	BadgeCheck,
	BookOpenCheck,
	ChevronDown,
	Clapperboard,
	FileAudio,
	FileVideo,
	Images,
} from "lucide-svelte";

type ActionReturn = {
	destroy?: () => void;
};

type Props = {
	reel: VirtualReel;
	selectedAnswer: number | undefined;
	isPaused: boolean;
	swipeOffset: number;
	onAnswerQuiz: (answerKey: string, optionIndex: number) => void;
	onTogglePause: (key: string) => void;
	onNextReel: (key: string) => void;
	onBindReel: (node: HTMLElement, key: string) => ActionReturn;
	onBindVideo: (node: HTMLVideoElement, key: string) => ActionReturn;
};

let {
	reel,
	selectedAnswer,
	isPaused,
	swipeOffset,
	onAnswerQuiz,
	onTogglePause,
	onNextReel,
	onBindReel,
	onBindVideo,
}: Props = $props();

const item = $derived(reel.item);
let videoProgress = $state(0);
let videoError = $state(false);
const END_THRESHOLD = 0.3;

function handleTimeUpdate(e: Event) {
	const video = e.currentTarget as HTMLVideoElement;
	if (video.duration > 0) {
		videoProgress = (video.currentTime / video.duration) * 100;
		if (video.duration - video.currentTime <= END_THRESHOLD) {
			onNextReel(reel.key);
		}
	}
	if (videoError) {
		videoError = false;
	}
}

function handleVideoError() {
	videoError = true;
}

function assetIcon(kind: "audio" | "image" | "video") {
	if (kind === "audio") return FileAudio;
	if (kind === "image") return Images;
	return FileVideo;
}
</script>

<article
	class="reel"
	id={`reel-${reel.loopIndex}`}
	data-reel-key={reel.key}
	use:onBindReel={reel.key}
	aria-label={item.title}
>
	{#if reel.shouldRender}
		<div
			class="phone"
			role="button"
			tabindex="0"
			aria-label={isPaused ? "Reproducir video" : "Pausar video"}
			onclick={() => onTogglePause(reel.key)}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onTogglePause(reel.key);
				}
			}}
		>
			<video
				src={reel.shouldPreload ? item.videoPath : undefined}
				poster={item.posterPath}
				loop
				muted
				playsinline
				preload={reel.shouldPreload ? "metadata" : "none"}
				ontimeupdate={handleTimeUpdate}
				onerror={handleVideoError}
				use:onBindVideo={reel.key}
			>
				<track kind="captions" />
			</video>

			{#if videoError && reel.isActive}
				<div class="video-error" aria-label="Error al cargar video">
					<p>Video no disponible</p>
					<small>El medio no se pudo cargar. Probá con el siguiente reel.</small>
				</div>
			{/if}

			<div class="progress-bar">
				<div class="progress-fill" style="width: {videoProgress}%"></div>
			</div>

			<div class="video-overlay">
				<div>
					<p class="eyebrow">Video {reel.reelNumber} · {item.durationSec}s</p>
					<h1>{item.title}</h1>
				</div>
				<div class="swipe-hint">
					{#if swipeOffset !== 0}
						<span class:flipped={swipeOffset > 0}>
							<ChevronDown size={14} />
						</span>
					{/if}
					Deslizá
				</div>
			</div>

			<button
				class="next-btn"
				type="button"
				aria-label="Próximo video"
				onclick={(e) => {
					e.stopPropagation();
					onNextReel(reel.key);
				}}
			>
				<ChevronDown size={24} />
			</button>

			{#if isPaused && reel.isActive}
				<div class="pause-indicator" aria-label="Video pausado">▌▌</div>
			{/if}
		</div>

		<aside class="lesson">
			<div class="lesson-head">
				<div>
					<p class="eyebrow">Después del video</p>
					<h2>Pregunta rápida</h2>
				</div>
				<BookOpenCheck size={24} />
			</div>

			<div class="question">
				<h3>{item.quiz.question}</h3>
				<div class="answers">
					{#each item.quiz.options as option, optionIndex}
						<button
							type="button"
							class:chosen={selectedAnswer === optionIndex}
							class:correct={selectedAnswer !== undefined &&
								optionIndex === item.quiz.answerIndex}
							class:wrong={selectedAnswer === optionIndex &&
								optionIndex !== item.quiz.answerIndex}
							onclick={() => onAnswerQuiz(reel.key, optionIndex)}
						>
							<span class="mono">{String.fromCharCode(65 + optionIndex)}</span>
							{option}
						</button>
					{/each}
				</div>

				{#if selectedAnswer !== undefined}
					<p class="explanation">
						<BadgeCheck size={18} />
						{item.quiz.explanation}
					</p>
				{/if}
			</div>

			<div class="pipeline">
				<div class="lesson-head compact">
					<div>
						<p class="eyebrow">AIServices</p>
						<h2>Cadena de medios</h2>
					</div>
					<Clapperboard size={22} />
				</div>

				{#each item.assets as asset}
					{@const Icon = assetIcon(asset.kind)}
					<a class="asset" href={asset.path} target="_blank" rel="noreferrer">
						<Icon size={19} />
						<span>
							<strong>{asset.provider}</strong>
							<small>{asset.path}</small>
						</span>
					</a>
				{/each}
			</div>

			<div class="brief">
				<p class="eyebrow">Guion de voz</p>
				<p>{item.brief.script}</p>
			</div>
		</aside>
	{:else}
		<div class="phone placeholder"></div>
		<aside class="lesson placeholder">
			<div class="lesson-head">
				<div>
					<p class="eyebrow">Cargando...</p>
					<h2>-</h2>
				</div>
			</div>
		</aside>
	{/if}
</article>

<style>
	.reel {
		display: grid;
		height: 100vh;
		grid-template-columns: minmax(320px, 440px) minmax(360px, 560px);
		gap: clamp(20px, 4vw, 64px);
		align-items: center;
		justify-content: center;
		padding: 92px 22px 34px;
		scroll-snap-align: start;
		overflow: hidden;
	}

	.phone {
		position: relative;
		overflow: hidden;
		display: block;
		justify-self: center;
		width: min(100%, calc((100vh - 126px) * 9 / 16));
		max-height: calc(100vh - 126px);
		padding: 0;
		aspect-ratio: 9 / 16;
		border: 2px solid var(--ink);
		background: var(--ink);
		box-shadow: 10px 10px 0 var(--blue);
		color: inherit;
		cursor: pointer;
	}

	.phone.placeholder {
		background: var(--line);
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.progress-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: rgb(255 250 241 / 22%);
		z-index: 3;
		pointer-events: none;
	}

	.progress-fill {
		height: 100%;
		background: var(--yellow);
		transition: width 0.1s linear;
	}

	.next-btn {
		position: absolute;
		bottom: 12px;
		right: 12px;
		z-index: 3;
		display: grid;
		width: 40px;
		height: 40px;
		place-items: center;
		padding: 0;
		border: 1px solid rgb(255 250 241 / 62%);
		border-radius: 50%;
		background: rgb(0 0 0 / 52%);
		color: #fffaf1;
		cursor: pointer;
		backdrop-filter: blur(4px);
		transition: transform 0.15s ease;
	}

	.next-btn:hover {
		transform: scale(1.12);
		background: rgb(0 0 0 / 72%);
	}

	.video-overlay {
		position: absolute;
		inset: auto 0 0;
		display: grid;
		gap: 18px;
		padding: 80px 18px 18px;
		background: linear-gradient(180deg, transparent, rgb(0 0 0 / 78%));
		color: #fffaf1;
		pointer-events: none;
	}

	.eyebrow {
		margin: 0 0 6px;
		color: var(--yellow);
		font-family: var(--font-mono);
		font-size: 0.74rem;
		font-weight: 800;
		letter-spacing: 0;
		text-transform: uppercase;
	}

	h1,
	h2,
	h3,
	p {
		margin-top: 0;
	}

	h1 {
		max-width: 12ch;
		margin-bottom: 0;
		font-size: clamp(2rem, 4.4vw, 4rem);
		line-height: 0.92;
		overflow-wrap: anywhere;
		hyphens: auto;
	}

	h2 {
		margin-bottom: 0;
		font-size: 1.6rem;
		line-height: 1;
	}

	h3 {
		font-size: 1.35rem;
		line-height: 1.08;
	}

	.swipe-hint {
		display: inline-flex;
		gap: 6px;
		align-items: center;
		width: fit-content;
		padding: 7px 10px;
		border: 1px solid rgb(255 250 241 / 52%);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		transition: transform 0.15s ease;
	}

	.swipe-hint span :global(svg) {
		transition: transform 0.15s ease;
	}

	.swipe-hint span.flipped :global(svg) {
		transform: rotate(180deg);
	}

	.pause-indicator {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		background: rgb(0 0 0 / 30%);
		color: #fffaf1;
		font-size: 3rem;
		letter-spacing: 0.3em;
		pointer-events: none;
		animation: fade-in 0.15s ease;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.video-error {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: 24px;
		background: var(--ink);
		color: #fffaf1;
		text-align: center;
		animation: fade-in 0.2s ease;
	}

	.video-error p {
		margin: 0 0 8px;
		font-size: 1.2rem;
		font-weight: 700;
	}

	.video-error small {
		color: var(--line);
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}

	.lesson {
		display: grid;
		gap: 14px;
		overflow-y: auto;
		max-height: calc(100vh - 126px);
	}

	.lesson.placeholder {
		opacity: 0.35;
	}

	.lesson-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.lesson-head.compact {
		margin-bottom: 8px;
	}

	.question,
	.pipeline,
	.brief {
		border: 1px solid var(--ink);
		background: rgb(255 250 241 / 92%);
		box-shadow: var(--shadow);
		padding: 18px;
	}

	.answers {
		display: grid;
		gap: 10px;
	}

	.answers button {
		display: grid;
		grid-template-columns: 34px minmax(0, 1fr);
		gap: 10px;
		align-items: center;
		min-height: 54px;
		padding: 10px 12px;
		border: 1px solid var(--line);
		background: #fffdf8;
		color: var(--ink);
		text-align: left;
	}

	.answers button:hover,
	.answers button.chosen {
		border-color: var(--ink);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.answers button.correct {
		background: var(--mint);
	}

	.answers button.wrong {
		background: #f0d1cc;
	}

	.answers .mono {
		display: grid;
		height: 32px;
		place-items: center;
		background: var(--ink);
		color: #fffdf8;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 800;
	}

	.explanation {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		margin: 14px 0 0;
		color: var(--green);
		font-weight: 700;
	}

	.pipeline {
		background: #fffdf8;
		box-shadow: none;
	}

	.asset {
		display: grid;
		grid-template-columns: 28px minmax(0, 1fr);
		gap: 10px;
		align-items: center;
		padding: 10px 0;
		border-top: 1px solid var(--line);
		color: var(--ink);
		text-decoration: none;
	}

	.asset strong,
	.asset small {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.asset small {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.72rem;
	}

	.brief p:last-child {
		display: -webkit-box;
		overflow: hidden;
		margin-bottom: 0;
		color: var(--muted);
		font-size: 1.05rem;
		line-height: 1.38;
		line-clamp: 5;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
	}

	@media (max-width: 900px) {
		.reel {
			grid-template-columns: minmax(0, 1fr);
			padding-top: 24px;
			scroll-snap-align: none;
		}

		.phone {
			width: min(100%, 420px);
			justify-self: center;
		}
	}
</style>
