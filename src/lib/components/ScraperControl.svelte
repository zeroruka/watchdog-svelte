<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { HTTP } from '$lib/axios';
	import { Button } from '$lib/components/ui/button';
	import { Pause, Play } from 'lucide-svelte';

	async function toggleScraper() {
		const token = $page.data.token;
		HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		if ($page.data.user.scraper_status) {
			await HTTP.post('/control/stop/');
		} else {
			await HTTP.post('/control/start/');
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
