import { HTTP } from '$lib/axios';
import { toTitleCase, transformObject } from '$lib/utils';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const { data } = await HTTP.get('/scraper/');

	const urls = transformObject(data) as ScraperUrl[];
	return { urls };
};

export const actions = {
	add: async ({ request }) => {
		const form = await request.formData();
		const url = form.get('url');
		const name = form.get('name');

		if (!url || !name) {
			return fail(400, { message: 'No URL or name provided' });
		}

		const newUrl = {
			name: toTitleCase(name.toString()),
			url
		};

		try {
			await HTTP.put('/scraper/', newUrl);
		} catch (error: any) {
			return fail(error.response.status, error.response.data);
		}

		return {
			message: 'URL added'
		};
	},
	delete: async ({ request }) => {
		const form = await request.formData();
		const url = form.get('url');

		if (!url) {
			return fail(400, { message: 'No URL provided' });
		}

		try {
			await HTTP.delete(`/scraper/`, {
				data: { url }
			});
		} catch (error: any) {
			return fail(error.response.status, error.response.data);
		}

		return {
			message: 'URL deleted'
		};
	}
};
