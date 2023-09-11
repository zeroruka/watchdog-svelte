import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { loginFormSchema } from './login-form.svelte';

export const load = async () => {
	return {
		form: superValidate(loginFormSchema)
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, loginFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const rsp = await event.fetch('/login/', {
			method: 'POST',
			body: JSON.stringify({ username: form.data.username, password: form.data.password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await rsp.json();

		if (rsp.status === 200) {
			const token = data.token;
			event.cookies.set('token', token, {
				path: '/'
			});

			throw redirect(302, '/dashboard');
		}

		if (rsp.status === 401) {
			setError(form, 'password', 'Incorrect password or username');
			setError(form, 'username', 'Incorrect password or username');
		} else {
			setError(form, 'password', 'Something went wrong');
			setError(form, 'username', 'Something went wrong');
		}
		return fail(400, { form });
	}
};
