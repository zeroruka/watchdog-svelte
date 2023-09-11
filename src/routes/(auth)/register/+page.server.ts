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

		rsp = await event.fetch('/register/', {
			method: 'POST',
			body: JSON.stringify({
				username: form.data.username,
				password: form.data.password,
				account: form.data.account
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		switch (rsp.status) {
			case 201: {
				rsp = await event.fetch('/login/', {
					method: 'POST',
					body: JSON.stringify({ username: form.data.username, password: form.data.password }),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				if (rsp.status === 200) {
					const data = await rsp.json();
					const token = data.token;

					event.cookies.set('token', token);

					throw redirect(302, '/dashboard');
				}

				if (rsp.status === 401) {
					setError(form, 'password', 'Invalid username or password');
				} else {
					setError(form, 'password', 'Login failed');
				}

				return fail(400, { form });
			}
			case 401:
				setError(form, 'account', 'Invalid account id');
				return fail(400, { form });

			case 402:
				setError(form, 'username', 'Username already exists');
				return fail(400, { form });

			default:
				setError(form, 'password', 'Registration failed');
				return fail(400, { form, rsp: rsp.json() });
		}
	}
};
