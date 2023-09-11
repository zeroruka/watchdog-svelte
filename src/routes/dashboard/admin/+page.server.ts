import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ fetch }) => {
		const rsp = await fetch('/admin/start-all-scrapers/');
		if (rsp.status !== 200) {
			return fail(400, { message: 'Failed to start all scrapers' });
		}

		return {
			status: 200,
			message: 'Started all scrapers'
		};
	}
};
