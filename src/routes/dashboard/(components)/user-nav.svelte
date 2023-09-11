<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	function getInitials(name: string) {
		return name
			.split(' ')
			.map((word) => word[0].toUpperCase())
			.join('');
	}
</script>

<DropdownMenu.Root positioning={{ placement: 'bottom-end' }}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src="" alt={$page.data.user.username} />
				<Avatar.Fallback>{getInitials($page.data.user.username)}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{$page.data.user.username}</p>
				<p class="text-xs leading-none text-muted-foreground">Chat ID: {$page.data.user.chat_id}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<a href="/dashboard">
				<DropdownMenu.Item>Dashboard</DropdownMenu.Item>
			</a>
			<a href="/dashboard/settings">
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
			</a>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<a href="/api/signout">
			<DropdownMenu.Item>Log out</DropdownMenu.Item>
		</a>
	</DropdownMenu.Content>
</DropdownMenu.Root>
