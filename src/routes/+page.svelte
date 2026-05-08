<script lang="ts">
import ReelFeed from "$lib/client/ReelFeed.svelte";
import type { PageData } from "./$types";

const { data }: { data: PageData } = $props();
</script>

<ReelFeed facts={data.facts} feedItems={data.feedItems} />
