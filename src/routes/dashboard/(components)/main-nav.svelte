<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { cn } from '$lib/utils';
	import { Menu } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const paths = [
		{
			name: 'Scraper Urls',
			href: '/dashboard'
		},
		{
			name: 'Results',
			href: '/dashboard/results'
		},
		{
			name: 'Settings',
			href: '/dashboard/settings'
		}
	];

	if ($page.data.user.username === 'admin') {
		paths.push({
			name: 'Admin',
			href: '/dashboard/admin'
		});
	}

	$: classesActive = (href: string) =>
		($page.url.pathname.startsWith(href) && href !== '/dashboard') || $page.url.pathname === href
			? '!text-primary'
			: '';
</script>

<nav class={cn('hidden items-center space-x-4 lg:space-x-6 sm:flex', className)}>
	{#each paths as path}
		<a
			href={path.href}
			class="{classesActive(
				path.href
			)} text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
		>
			{path.name}
		</a>
	{/each}
</nav>

<nav class="sm:hidden">
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]} variant="ghost">
				<Menu />
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="top">
			<div class="flex flex-col space-y-2">
				{#each paths as path}
					<Sheet.Close asChild let:builder>
						<Button
							href={path.href}
							builders={[builder]}
							variant="link"
							class="{classesActive(
								path.href
							)} text-xl font-medium transition-colors hover:text-primary text-muted-foreground justify-start"
						>
							{path.name}
						</Button>
					</Sheet.Close>
				{/each}
			</div>
		</Sheet.Content>
	</Sheet.Root>
</nav>
