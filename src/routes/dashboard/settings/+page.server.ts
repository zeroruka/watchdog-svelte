import { HTTP } from '$lib/axios';
import { fail, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { profileFormSchema } from './profile-form.svelte';

export const load: PageServerLoad = async () => {
	const profile = await HTTP.get('/get-user-profile/');
	if (profile.status !== 200) {
		return;
	}
	const user = profile.data;

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
