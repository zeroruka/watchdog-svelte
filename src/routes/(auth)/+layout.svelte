<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Eye } from 'lucide-svelte';
</script>

<div class="relative h-screen flex-col items-center justify-center grid grid-cols-1 lg:grid-cols-2">
	{#key $page.url.pathname}
		<Button
			href={$page.url.pathname === '/login' ? '/register' : '/login'}
			variant="ghost"
			class="absolute right-4 top-4 md:right-8 md:top-8"
		>
			{$page.url.pathname === '/login' ? 'Register' : 'Login'}
		</Button>
	{/key}
	<div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
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
	<div class="lg:p-8">
		<slot />
	</div>
</div>
