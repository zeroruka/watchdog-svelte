import { HTTP } from '$lib/axios';
import { transformObject } from '$lib/utils';
import flatten from 'flat';

export const load = async () => {
	const { data } = await HTTP.get('/listings/');

	let listings = transformObject(data);
	listings = listings.map((listing) => (listing = flatten(listing)));
	return { listings: listings as ScrapedListing[] };
};
