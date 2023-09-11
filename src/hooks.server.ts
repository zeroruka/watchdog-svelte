import { HTTP } from '$lib/axios';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	console.log('hooks.server.ts token:', token);

	if (event.url.pathname === '/') {
		if (token) {
			throw redirect(303, '/dashboard');
		} else {
			throw redirect(303, '/login');
		}
	}

	if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
		if (token) {
			throw redirect(303, '/dashboard');
		}
	}

	if (event.url.pathname.startsWith('/api/signout')) {
		event.cookies.delete('token', {
			path: '/'
		});

		throw redirect(303, '/login');
	}

	if (event.url.pathname.startsWith('/dashboard')) {
		if (!token) {
			throw redirect(303, '/login');
		}
		HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	}

	return await resolve(event);
};
