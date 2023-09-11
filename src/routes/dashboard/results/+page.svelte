<script lang="ts">
	import DataTable from './data-table.svelte';
	export let data;
</script>

<div class="flex items-center justify-between space-y-2">
	<h2 class="text-3xl font-bold tracking-tight">Scraped Listings</h2>
</div>

<DataTable data={data.listings} />
