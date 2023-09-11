<script lang="ts">
	import RegisterForm from './register-form.svelte';

	export let data;
	export let form;

	$: console.log(form);
</script>

<div class="mx-auto flex p-4 flex-col justify-center space-y-6 sm:w-[350px]">
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">Hi there!</h1>
		<p class="text-sm text-muted-foreground">Enter your email and password to get started</p>
	</div>
	<RegisterForm data={data.form} />
</div>
