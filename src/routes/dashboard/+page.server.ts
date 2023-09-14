import { toTitleCase, transformObject } from '$lib/utils';
import { fail } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const rsp = await fetch(`/scraper/`);

	const data = await rsp.json();

	const urls = transformObject(data) as ScraperUrl[];
	return { urls };
};

export const actions = {
	add: async ({ request, fetch }) => {
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

		const rsp = await fetch('/scraper/', {
			method: 'PUT',
			body: JSON.stringify(newUrl),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (rsp.status !== 201) {
			return fail(rsp.status, await rsp.json());
		}

		return {
			message: 'URL added'
		};
	},
	delete: async ({ request, fetch }) => {
		const form = await request.formData();
		const url = form.get('url');

		if (!url) {
			return fail(400, { message: 'No URL provided' });
		}

		const rsp = await fetch('/scraper/', {
			method: 'DELETE',
			body: JSON.stringify({ url }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (rsp.status !== 200) {
			return fail(rsp.status, await rsp.json());
		}

		return {
			message: 'URL deleted'
		};
	}
};
