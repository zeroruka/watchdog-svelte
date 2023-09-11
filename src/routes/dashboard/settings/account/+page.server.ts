import { fail, redirect, type Actions } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { accountFormSchema } from './account-form.svelte';

export const load: PageServerLoad = async () => {
	return {
		form: superValidate(accountFormSchema)
	};
};

export const actions: Actions = {
	update: async (event) => {
		const form = await superValidate(event, accountFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const rsp = await event.fetch('/change-password/', {
			method: 'POST',
			body: JSON.stringify({
				old_password: form.data.oldPassword,
				new_password: form.data.newPassword
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (rsp.status === 200) {
			return {
				form
			};
		}

		if (rsp.status === 400)
			setError(form, 'newPassword', 'New password cannot be the same as old password');
		else if (rsp.status === 401) {
			setError(form, 'oldPassword', 'Incorrect password');
		} else {
			setError(form, 'oldPassword', 'Something went wrong');
		}
		return fail(400, {
			form
		});
	},
	delete: async () => {
		// Dont actually delete the account , testing purposes
		// try {
		// 	await HTTP.delete('/goodbye/');
		// } catch (error) {
		// 	console.error(error);
		// 	return fail(400, {
		// 		error: 'Something went wrong'
		// 	});
		// }

		// Log the user out
		throw redirect(303, '/api/signout');
	}
};
