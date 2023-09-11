<script lang="ts">
	import SidebarNav from '$lib/components/SidebarNav.svelte';
	import { Separator } from '$lib/components/ui/separator';

	const sidebarNavItems = [
		{
			title: 'Control Panel',
			href: '/dashboard/admin'
		},
		{
			title: 'All Users',
			href: '/dashboard/admin/users'
		},
		{
			title: 'All Listings',
			href: '/dashboard/admin/listings'
		}
	];
</script>

<div class="space-y-6 pb-16">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Admin Panel</h2>
		<p class="text-muted-foreground">Manage users and listings.</p>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="flex-1">
			<slot />
		</div>
	</div>
</div>
