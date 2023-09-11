type ScraperUrl = {
	added_by: string;
	id: string;
	name: string;
	url: string;
};

type User = {
	id: string;
	admin: boolean;
	chat_id: number;
	scraper_status: string;
	username: string;
};

type ScrapedListing = {
	id: string;
	'listing.date_added': string;
	'listing.images.thumbnail_l225px': string;
	'listing.images.source_l800px': string;
	'listing.new': boolean | null;
	'listing.origin_country': string;
	'listing.postage_fee': string;
	'listing.price': string;
	'listing.title': string;
	'listing.url': string;
	'seller.items_sold': number;
	'seller.name': string;
	'seller.rating': string;
};
