export async function load({ fetch }) {
	const rsp = await fetch('/admin/get-all-listings/');

	const allListings = await rsp.json();

	const transformedListings = [];

	for (const [username, listings] of Object.entries(allListings)) {
		for (const [key, value] of Object.entries(listings as { [key: string]: any })) {
			const listing = value.listing;
			const seller = value.seller;

			transformedListings.push({
				username: username.split('_')[0],
				id: key,
				title: listing.title,
				price: listing.price,
				url: listing.url,
				date_added: listing.date_added,
				new: listing.new,
				origin_country: listing.origin_country,
				postage_fee: listing.postage_fee,
				thumbnail_l225px: listing.images.thumbnail_l225px,
				source_l800px: listing.images.source_l800px,
				name: seller.name,
				items_sold: seller.items_sold,
				rating: seller.rating
			});
		}
	}

	return { listings: transformedListings };
}
