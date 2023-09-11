import { HTTP } from '$lib/axios';
import { transformObject } from '$lib/utils.js';

export async function load({ params }) {
	const { data } = await HTTP.get(`/listings?listing_id=${params.listing_id}`);
	return {
		details: transformObject(data)[0]
	};
}
