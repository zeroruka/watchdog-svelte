<script lang="ts">
	import AddUrlForm from './(components)/add-url-form.svelte';
	import DataTable from './(data-table)/data-table.svelte';

	export let data;
</script>

<div class="flex items-center justify-between space-y-2">
	<h2 class="text-3xl font-bold tracking-tight">Scraper Urls</h2>
	<div class="flex items-center space-x-2">
		<AddUrlForm />
	</div>
</div>

<DataTable data={data.urls} />
