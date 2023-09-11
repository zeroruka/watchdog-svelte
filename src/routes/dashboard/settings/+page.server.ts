import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { profileFormSchema } from './profile-form.svelte';

export const load = async ({ fetch }) => {
	const rsp = await fetch('/get-user-profile/');

	if (rsp.status !== 200) {
		return;
	}
	const user = await rsp.json();

	return {
		form: superValidate({ username: user.username }, profileFormSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, profileFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return {
			form
		};
	}
};
