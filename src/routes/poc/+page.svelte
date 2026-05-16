<script lang="ts">
const reels = Array.from({ length: 10 }, (_, i) => ({
	num: String(i + 1).padStart(2, "0"),
	video: `/generated-media/reel-poc/final/reel-${String(i + 1).padStart(2, "0")}.mp4`,
}));
</script>

<svelte:head>
	<title>ObstetraScroll - POC Reels</title>
</svelte:head>

<div class="poc">
	<h1>🧪 POC: 10 Reels</h1>
	<p class="subtitle">Kling-v1-6 video + ElevenLabs TTS audio (Chantini)</p>

	<div class="grid">
		{#each reels as reel}
			<div class="card">
				<h2>Reel {reel.num}</h2>
				<video controls preload="metadata" width="360" height="640" playsinline>
					<source src={reel.video} type="video/mp4" />
					<p>Tu navegador no soporta video HTML5.</p>
				</video>
			</div>
		{/each}
	</div>
</div>

<style>
	.poc {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		font-family: system-ui, sans-serif;
	}
	h1 { text-align: center; }
	.subtitle { text-align: center; color: #666; margin-bottom: 2rem; }
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
		gap: 1.5rem;
	}
	.card {
		border: 1px solid #ddd;
		border-radius: 12px;
		padding: 1rem;
		text-align: center;
		background: #fafafa;
	}
	.card h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }
	video { width: 100%; max-width: 360px; border-radius: 8px; background: #000; }
</style>
