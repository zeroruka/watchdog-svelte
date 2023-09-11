import { transformObject } from '$lib/utils';
import flatten from 'flat';

export const load = async ({ fetch }) => {
	const rsp = await fetch('/listings/');

	let listings = transformObject(await rsp.json());
	listings = listings.map((listing) => (listing = flatten(listing)));
	return { listings: listings as ScrapedListing[] };
};
