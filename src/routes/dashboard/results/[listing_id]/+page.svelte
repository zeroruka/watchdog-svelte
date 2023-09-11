<script lang="ts">
	import Card from '$lib/components/ui/card/card.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Separator } from '$lib/components/ui/separator';

	export let data;
</script>

<div class="flex justify-between w-full sm:space-x-8 space-y-4 sm:space-y-0 sm:flex-row flex-col">
	<Card class="overflow-hidden w-full">
		<img
			class="bg-center bg-cover w-full h-full"
			src={data.details.listing.images.source_l800px}
			alt={data.details.listing.title}
		/>
	</Card>
	<div class="space-y-4">
		<h1 class="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
			{data.details.listing.title}
		</h1>
		<Separator />

		<div>
			<h2 class="text-xl tracking-tight">{data.details.listing.price}</h2>
			<p>Postage: {data.details.listing.postage_fee}</p>
		</div>

		<ol>
			<li>
				<Label>Date Added:</Label>
				<span>{data.details.listing.date_added}</span>
			</li>
			<li>
				<Label>Origin Country:</Label>
				<span>{data.details.listing.origin_country}</span>
			</li>
			<li>
				<Label>Seller:</Label>
				<span>{data.details.seller.name} </span>
				<span>(rating: {data.details.seller.rating})</span>
			</li>
			<li>
				<Label>Seller Items Sold:</Label>
				<span>{data.details.seller.items_sold}</span>
			</li>
		</ol>
	</div>
</div>
