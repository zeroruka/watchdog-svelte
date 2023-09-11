<script lang="ts" context="module">
	import { z } from 'zod';
	export const profileFormSchema = z.object({
		username: z
			.string()
			.min(2, 'Username must be at least 2 characters.')
			.max(30, 'Username must not be longer than 30 characters')
			.optional(),
		bio: z.string().max(160).optional(),
		website: z.string().url({ message: 'Please enter a valid URL.' }).optional()
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let data: SuperValidated<ProfileFormSchema>;
</script>

<Form.Root form={data} schema={profileFormSchema} let:config method="POST" class="space-y-8">
	<Form.Item>
		<Form.Field {config} name="username">
			<Form.Label>Username</Form.Label>
			<Form.Input placeholder="@shadcn" />
			<Form.Description>
				This is your account login username. It can be your real name or a pseudonym <br /> (you can't
				actually change the username, its just here to fill the page)
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="bio">
			<Form.Label>Bio</Form.Label>
			<Form.Textarea placeholder="Tell us a little bit about yourself" class="resize-none" />
			<Form.Description>
				You can <span>@mention</span> other users and organizations to link to them. <br /> (this doesn't
				actually do anything, its just here to fill the page)
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="website">
			<Form.Label>Website</Form.Label>
			<Form.Input placeholder="https://www.njc.moe/" />
			<Form.Description
				>Your personal website, blog, or portfolio.<br /> (this doesn't actually do anything, its just
				here to fill the page)</Form.Description
			>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Button>Update profile</Form.Button>
</Form.Root>
