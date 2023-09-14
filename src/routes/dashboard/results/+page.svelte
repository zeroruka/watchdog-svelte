<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { RefreshCcw } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import DataTable from './data-table.svelte';
	export let data;

	let loading = false;
	async function reload() {
		loading = true;
		await invalidateAll();
		await setTimeout(() => {
			loading = false;
		}, Math.floor(Math.random() * 300) + 200); // Set random timeout between 200 and 500 to make it feel slower
	}

	onMount(() => {
		// Reload every 3 seconds
		const interval = setInterval(() => {
			reload();
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<div class="flex items-center justify-between space-y-2">
	<h2 class="text-3xl font-bold tracking-tight">Scraped Listings</h2>
	<Button variant="outline" on:click={() => reload()} disabled={loading}>
		<RefreshCcw class={cn('h-4 w-4 mr-2', loading ? 'animate-spin' : '')} />
		Reload</Button
	>
</div>

<DataTable data={data.listings} />
