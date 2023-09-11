<script lang="ts">
	import SidebarNav from '$lib/components/SidebarNav.svelte';
	import { Separator } from '$lib/components/ui/separator';

	const sidebarNavItems = [
		{
			title: 'Profile',
			href: '/dashboard/settings'
		},
		{
			title: 'Account',
			href: '/dashboard/settings/account'
		},
		{
			title: 'Notifications',
			href: '/dashboard/settings/notifications'
		}
	];
</script>

<div class="space-y-6 pb-16">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Settings</h2>
		<p class="text-muted-foreground">Manage your account settings.</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="flex-1 lg:max-w-2xl">
			<slot />
		</div>
	</div>
</div>
