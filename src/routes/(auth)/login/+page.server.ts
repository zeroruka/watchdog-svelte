import { HTTP } from '$lib/axios';
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
		console.log('Here!');
		const form = await superValidate(event, loginFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const rsp = await HTTP.post('/login/', {
				username: form.data.username,
				password: form.data.password
			});
			console.log(rsp.data);
			const token = rsp.data.token;
			event.cookies.set('token', token, {
				path: '/'
			});
			HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		} catch (error: any) {
			console.log(error);
			if (error.response.status === 401) {
				setError(form, 'password', 'Incorrect password or username');
				setError(form, 'username', 'Incorrect password or username');
			}
			return fail(400, { form });
		}
		throw redirect(302, '/dashboard');
	}
};
