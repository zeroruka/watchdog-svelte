import { transformObject } from '$lib/utils.js';

export async function load({ params, fetch }) {
	const rsp = await fetch(`/listings?listing_id=${params.listing_id}`);
	return {
		details: transformObject(await rsp.json())[0]
	};
}
