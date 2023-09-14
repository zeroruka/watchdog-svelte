<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { transition } from '$lib/utils';
	import { Loader2 } from 'lucide-svelte';

	let loading = false;
</script>

<Card.Root class=" border-muted-foreground">
	<Card.Header>
		<Card.Title>Start All Scrapers</Card.Title>
		<Card.Description>
			Initialise scrapers of every so that it matches the saved scraper state of each user. <br />
			<b>Only use when the server is restarted.</b>
		</Card.Description>
	</Card.Header>

	<Card.Footer>
		<form
			method="POST"
			use:enhance={() => {
				transition(() => (loading = true));
				return async ({ update }) => {
					await new Promise((resolve) => setTimeout(resolve, 1000)); // Make it look like it's doing something lmao
					transition(() => (loading = false));
					await update();
				};
			}}
		>
			<Button disabled={loading} style="view-transition-name: button;">
				{#if loading}
					<Loader2 class="w-4 h-4 mr-2 animate-spin" />
				{/if}
				Start All
			</Button>
		</form>
	</Card.Footer>
</Card.Root>

<style>
	:global(html)::view-transition-old(button),
	:global(html)::view-transition-new(button) {
		width: 100%;
		height: 100%;
	}
</style>
