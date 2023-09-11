<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import AccountForm from './account-form.svelte';

	export let data;
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">Update your account password.</p>
	</div>
	<Separator />
	<AccountForm data={data.form} />
	<Card.Root class="border-destructive">
		<Card.Header>
			<Card.Title>Account Deletion</Card.Title>
			<Card.Description>
				Permanently delete your account. This action is irreversible.
			</Card.Description>
		</Card.Header>

		<Card.Footer>
			<AlertDialog.Root>
				<AlertDialog.Trigger asChild let:builder>
					<Button builders={[builder]} variant="destructive">Delete Account</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will permanently delete your account and remove
							your data from our servers.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<form method="POST" action="?/delete">
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action type="submit" class={buttonVariants({ variant: 'destructive' })}>
								Delete
							</AlertDialog.Action>
						</form>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</Card.Footer>
	</Card.Root>
</div>
