<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { transition } from '$lib/utils';
	import { Loader2, Plus } from 'lucide-svelte';

	let loading = false;
	let isOpen = false;
</script>

<Dialog.Root bind:open={isOpen}>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Dialog.Trigger
				class={buttonVariants({ variant: 'default' })}
				disabled={$page.data.user.scraper_status}
			>
				<Plus class="mr-2 h-4 w-4" />
				Add Url
			</Dialog.Trigger>
		</Tooltip.Trigger>
		{#if $page.data.user.scraper_status}
			<Tooltip.Content>
				<p>Stop scraper before adding URLs</p>
			</Tooltip.Content>
		{/if}
	</Tooltip.Root>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Url</Dialog.Title>
			<Dialog.Description>
				Add a new url to be scraped by the best scraper in the world.
			</Dialog.Description>
		</Dialog.Header>
		<form
			method="POST"
			use:enhance={() => {
				transition(() => (loading = true));
				return async ({ update }) => {
					await new Promise((resolve) => setTimeout(resolve, 600)); // Make it look like it's doing something lmao
					transition(() => (loading = false));
					isOpen = false;
					await update();
				};
			}}
			action="?/add"
			id="add-url-form"
		>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Name</Label>
					<Input id="name" name="name" placeholder="Malaya Notes" class="col-span-3" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Search Phrase</Label>
					<Input
						id="url"
						name="url"
						placeholder="malaya notes, good condition etc..."
						class="col-span-3"
					/>
				</div>
			</div>
		</form>
		<Dialog.Footer>
			<Button type="submit" form="add-url-form" style="view-transition-name: button;">
				{#if loading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Add</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<style>
	:global(html)::view-transition-old(button),
	:global(html)::view-transition-new(button) {
		width: 100%;
		height: 100%;
	}
</style>
