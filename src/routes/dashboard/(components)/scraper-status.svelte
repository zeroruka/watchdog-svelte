<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	export let status: string;
</script>

<div>
	<Label>Scraper Status:</Label>
	<Badge variant="outline">{status}</Badge>
</div>
