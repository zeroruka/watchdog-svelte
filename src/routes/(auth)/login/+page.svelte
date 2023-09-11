<script lang="ts">
	import LoginForm from './login-form.svelte';

	export let data;

	console.log(data);
</script>

<div class="mx-auto flex p-4 flex-col justify-center space-y-6 sm:w-[350px]">
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Welcome back!</h1>
		<p class="text-sm text-muted-foreground">Enter your username and password to log in</p>
	</div>
	<LoginForm data={data.form} />
</div>
