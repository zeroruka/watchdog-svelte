import { PUBLIC_SERVER_URL } from '$env/static/public';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (token === 'undefined') {
		event.cookies.delete('token', {
			path: '/'
		});
	}

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
	}

	return await resolve(event);
};

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
	const token = event.cookies.get('token');
	if (request.url.startsWith('http://localhost:5173')) {
		request = new Request(request.url.replace('http://localhost:5173', PUBLIC_SERVER_URL), request);
	} else if (request.url.startsWith('https://watchdog.zeroruka.moe')) {
		request = new Request(
			request.url.replace('https://watchdog-api.zeroruka.moe', PUBLIC_SERVER_URL),
			request
		);
	} else {
		request = new Request(request.url, request);
	}

	if (!token) {
		return fetch(request);
	}

	request.headers.set('Authorization', 'Bearer ' + event.cookies.get('token'));

	return fetch(request);
};
