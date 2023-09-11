import { HTTP } from '$lib/axios';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async () => {
		try {
			await HTTP.get('/admin/start-all-scrapers/');
		} catch (error) {
			console.log(error);
			return fail(400, { message: 'Failed to start all scrapers' });
		}

		return {
			status: 200,
			message: 'Started all scrapers'
		};
	}
};
