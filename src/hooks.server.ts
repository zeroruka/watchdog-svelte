import { PUBLIC_SERVER_URL } from '$env/static/public';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	const user = await event.fetch('/get-user-profile/');

	if (user.status !== 200 && token) {
		event.cookies.delete('token', {
			path: '/'
		});

		throw redirect(303, '/login');
	}

	event.locals.user = await user.json();

	// Guard against undefined token (which is a string)
	if (token === 'undefined') {
		event.cookies.delete('token', {
			path: '/'
		});
	}

	// Since there is no base route '/' in the app, we need to redirect to dashboard if user is logged in
	if (event.url.pathname === '/') {
		if (token) {
			throw redirect(303, '/dashboard');
		} else {
			throw redirect(303, '/login');
		}
	}

	// Redirect to dashboard if logged in and trying to access login or register page
	if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
		if (token) {
			throw redirect(303, '/dashboard');
		}
	}

	// Route to log out
	if (event.url.pathname.startsWith('/api/signout')) {
		event.cookies.delete('token', {
			path: '/'
		});
		throw redirect(303, '/login');
	}

	// Redirect to login if not logged in and trying to access dashboard
	if (event.url.pathname.startsWith('/dashboard')) {
		if (!token) {
			throw redirect(303, '/login');
		}
	}

	return await resolve(event);
};

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
	// This hook modifies the fetch request to use the public server url defined in .env, and sets the Authorization header if the user is logged in
	const token = event.cookies.get('token');
	if (request.url.startsWith('http://localhost:5173')) {
		request = new Request(request.url.replace('http://localhost:5173', PUBLIC_SERVER_URL), request);
	} else if (request.url.startsWith('https://watchdog.zeroruka.moe')) {
		request = new Request(
			request.url.replace('https://watchdog.zeroruka.moe', PUBLIC_SERVER_URL),
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
