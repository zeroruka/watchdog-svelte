<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal } from 'lucide-svelte';

	export let row: any;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative w-8 h-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="w-4 h-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item on:click={() => (window.location = row.value.url)}
				>Visit Url</DropdownMenu.Item
			>
			<form use:enhance method="POST" action="?/delete">
				<input name="url" type="hidden" value={row.value.url} />
				<DropdownMenu.Item disabled={$page.data.user.scraper_status}>
					<Button
						type="submit"
						variant="ghost"
						class="w-full justify-start p-0 h-max font-normal text-destructive hover:text-destructive"
						>Delete</Button
					></DropdownMenu.Item
				>
			</form>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
