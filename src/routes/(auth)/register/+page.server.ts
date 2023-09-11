import { HTTP } from '$lib/axios';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { registerFormSchema } from './register-form.svelte';

export const load = async () => {
	return {
		form: superValidate(registerFormSchema)
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, registerFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		let rsp;
		try {
			rsp = await HTTP.post(
				'/register/',
				{
					username: form.data.username,
					password: form.data.password,
					account: form.data.account
				},
				{
					validateStatus: (status) => status === 201 || status === 401 || status === 402
				}
			);
		} catch (error) {
			console.error(error);
			setError(form, 'password', 'Registration failed');
			return { form };
		}

		switch (rsp.status) {
			case 201: {
				try {
					rsp = await HTTP.post('/login/', {
						username: form.data.username,
						password: form.data.password
					});
				} catch (error) {
					console.error(error);
					setError(form, 'password', 'Login failed');
					return { form };
				}

				if (rsp.status !== 200) {
					setError(form, 'password', 'Invalid username or password');
					return { form };
				}

				const token = rsp.data.token;
				event.cookies.set('token', token);
				HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token;
				throw redirect(302, '/dashboard');
			}
			case 401:
				setError(form, 'account', 'Invalid account id');
				return { form };

			case 402:
				setError(form, 'username', 'Username already exists');
				return { form };

			default:
				setError(form, 'password', 'Registration failed');
				return { form };
		}
	}
};
