<script lang="ts">
import "../app.css";

const { children } = $props();
</script>

<svelte:head>
	<title>ObstetraScroll</title>
	<meta
		name="description"
		content="Proof of concept para generar reels revisados para parteras y obstétricas."
	/>
</svelte:head>

{@render children?.()}
