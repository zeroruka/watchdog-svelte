<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import ScraperControl from '$lib/components/ScraperControl.svelte';
	import { LightSwitch } from '$lib/components/light-switch';
	import { gsap } from 'gsap';
	import DashboardMainNav from './(components)/main-nav.svelte';
	import ScraperStatus from './(components)/scraper-status.svelte';
	import UserNav from './(components)/user-nav.svelte';

	export let data;

	let navbar: HTMLElement;
	let content: HTMLElement;

	async function animateInitial(callback: () => void) {
		return new Promise<void>((resolve) => {
			const animation1 = gsap.from(navbar, {
				y: '-100%',
				duration: 0.4,
				ease: 'power2.out'
			});

			const animation2 = gsap.from(content, {
				opacity: 0,
				duration: 0.3,
				delay: 0.2,
				ease: 'power2.out'
			});

			const animation3 = gsap.from(content, {
				y: '-50%',
				duration: 0.45,
				ease: 'power2.out'
			});

			Promise.all([animation1, animation2, animation3]).then(() => {
				callback();
				resolve();
			});
		});
	}

	afterNavigate((navigation) => {
		if (!navigation.from?.route.id?.startsWith('/(auth)/')) return;

		return new Promise<void>((resolve) => {
			animateInitial(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="flex-col flex">
	<div class="border-b" bind:this={navbar}>
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
	<div class="flex-1 space-y-4 p-8 pt-6" bind:this={content}>
		<slot />
	</div>
</div>
