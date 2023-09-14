<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { gsap } from 'gsap';
	import { Eye } from 'lucide-svelte';

	let left: HTMLElement;
	let auth: HTMLElement;

	async function animate(callback: () => void) {
		return new Promise<void>((resolve) => {
			const animation1 = gsap.to(left, {
				x: '-100%',
				duration: 0.4,
				ease: 'power2.out'
			});

			const animation2 = gsap.to(auth, {
				x: '-50%',
				duration: 0.4,
				ease: 'power2.out'
			});

			const animation3 = gsap.to(auth, {
				opacity: 0,
				duration: 0.2,
				ease: 'power2.out',
				delay: 0.2
			});

			const animation4 = gsap.to('.switch-button', {
				opacity: 0,
				duration: 0.2,
				ease: 'power2.out'
			});

			Promise.all([animation1, animation2, animation3, animation4]).then(() => {
				callback();
				resolve();
			});
		});
	}

	onNavigate((navigation) => {
		if (navigation.to?.route.id !== '/dashboard') return;
		return new Promise((resolve) => {
			animate(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="h-screen flex-col items-center justify-center grid grid-cols-1 lg:grid-cols-2">
	{#key $page.url.pathname}
		<Button
			href={$page.url.pathname === '/login' ? '/register' : '/login'}
			variant="ghost"
			class="absolute right-4 top-4 md:right-8 md:top-8 switch-button"
		>
			{$page.url.pathname === '/login' ? 'Register' : 'Login'}
		</Button>
	{/key}
	<div
		class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
		bind:this={left}
	>
		<div
			class="absolute inset-0 bg-cover bg-center"
			style="
				background-image:
					url(./auth.png);"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<Eye class="mr-2 h-6 w-6" />
			Watchdog
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">&ldquo; Best service i've ever seen, strongly recommend! &rdquo;</p>
				<footer class="text-sm">- Joshua Theofilus Woo</footer>
			</blockquote>
		</div>
	</div>
	<div class="lg:p-8" bind:this={auth}>
		<slot />
	</div>
</div>
