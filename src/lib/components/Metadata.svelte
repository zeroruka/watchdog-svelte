<script lang="ts">
	import { page } from '$app/stores';

	export let title: string = 'Watchdog';

	$: title = $page.data?.title ? `${$page.data.title}` : 'Watchdog';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
