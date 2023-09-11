<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import { Pause, Play } from 'lucide-svelte';

	async function toggleScraper() {
		const token = $page.data.token;
		if ($page.data.user.scraper_status) {
			await fetch(PUBLIC_SERVER_URL + '/control/stop/', {
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` }
			});
		} else {
			await fetch(PUBLIC_SERVER_URL + '/control/start/', {
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` }
			});
		}
		await invalidateAll();
	}
</script>

{#if $page.data.user.scraper_status}
	<Button on:click={() => toggleScraper()} size="sm" class="min-w-max">
		<Pause class="mr-2 h-4 w-4" />
		Stop Scraper
	</Button>
{:else}
	<Button on:click={() => toggleScraper()} size="sm" class="min-w-max">
		<Play class="mr-2 h-4 w-4" />
		Start Scraper
	</Button>
{/if}
