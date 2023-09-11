<script lang="ts">
	import DataTable from './(data-table)/data-table.svelte';

	export let data;
</script>

<DataTable data={data.users} />
