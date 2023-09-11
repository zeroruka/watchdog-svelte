<script lang="ts">
	import ScraperControl from '$lib/components/ScraperControl.svelte';
	import { LightSwitch } from '$lib/components/light-switch';
	import DashboardMainNav from './(components)/main-nav.svelte';
	import ScraperStatus from './(components)/scraper-status.svelte';
	import UserNav from './(components)/user-nav.svelte';

	export let data;
</script>

<div class="flex-col flex">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<DashboardMainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<div class="hidden md:block">
					<ScraperStatus status={data.user.scraper_status ? 'Active' : 'Inactive'} />
				</div>
				<ScraperControl />
				<LightSwitch />

				<UserNav />
			</div>
		</div>
	</div>
	<div class="flex-1 space-y-4 p-8 pt-6">
		<slot />
	</div>
</div>
