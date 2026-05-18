<script lang="ts">
import { page } from "$app/stores";

const _status = $derived($page.status);
const _errorMessage = $derived($page.error?.message);
</script>

<svelte:head>
	<title>Error — ObstetraScroll</title>
</svelte:head>

<main class="error-page">
	<div class="error-card">
		<div class="brand-mark"><Sparkles size={28} /></div>
		<h1>Algo salió mal</h1>
		<p class="code">Error {status}</p>
		<p>{errorMessage || "No se pudo cargar el feed. Recargá la página e intentá de nuevo."}</p>
		<a href="/" class="retry-link">Volver al inicio</a>
	</div>
</main>

<style>
	.error-page {
		display: grid;
		min-height: 100vh;
		place-items: center;
		background: var(--paper);
	}

	.error-card {
		max-width: 420px;
		padding: 48px 36px;
		border: 1px solid var(--ink);
		background: #fffdf8;
		box-shadow: 10px 10px 0 var(--blue);
		text-align: center;
	}

	.brand-mark {
		display: grid;
		width: 56px;
		height: 56px;
		margin: 0 auto 20px;
		place-items: center;
		border: 1px solid var(--ink);
		background: var(--yellow);
		box-shadow: 4px 4px 0 var(--ink);
	}

	h1 {
		margin: 0 0 8px;
		font-size: 1.6rem;
	}

	.code {
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.82rem;
	}

	p {
		margin: 16px 0;
		color: var(--muted);
		line-height: 1.45;
	}

	.retry-link {
		display: inline-block;
		padding: 10px 22px;
		border: 1px solid var(--ink);
		background: var(--yellow);
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: 0.85rem;
		text-decoration: none;
		text-transform: uppercase;
		box-shadow: 4px 4px 0 var(--ink);
	}
</style>
