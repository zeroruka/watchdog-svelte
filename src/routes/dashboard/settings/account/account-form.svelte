<script lang="ts" context="module">
	import { z } from 'zod';

	export const accountFormSchema = z
		.object({
			oldPassword: z.string().min(8, 'Password must be at least 8 characters.'),
			newPassword: z.string().min(8, 'Password must be at least 8 characters.'),
			confirmPassword: z.string().min(8, 'Password must be at least 8 characters.')
		})
		.refine((data) => data.newPassword === data.confirmPassword, {
			message: 'Passwords do not match.',
			path: ['confirmPassword']
		});

	export type AccountFormSchema = typeof accountFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let data: SuperValidated<AccountFormSchema>;
</script>

<Form.Root
	method="POST"
	action="?/update"
	class="space-y-8"
	let:config
	schema={accountFormSchema}
	form={data}
	options={{ resetForm: true }}
>
	<Form.Item>
		<Form.Field name="oldPassword" {config}>
			<Form.Label>Old Password</Form.Label>
			<Form.Input type="password" placeholder="Your old password" />
			<Form.Description>Enter your old password.</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field name="newPassword" {config}>
			<Form.Label>New Password</Form.Label>
			<Form.Input type="password" placeholder="Your new password" />
			<Form.Description>
				Enter your new password. It must be at least 8 characters.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field name="confirmPassword" {config}>
			<Form.Label>Confirm New Password</Form.Label>
			<Form.Input type="password" placeholder="Confirm your new password" />
			<Form.Description>
				Confirm your new password. It must match the new password.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Button>Update account</Form.Button>
</Form.Root>
