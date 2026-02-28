import { TrolleyIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
	name: 'product',
	title: 'Product',
	type: 'document',
	icon: TrolleyIcon,
	fields: [
		defineField({
			name: 'name',
			title: 'Product Name',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96,
			},
		}),
		defineField({
			name: 'intro',
			title: 'Intro',
			type: 'string',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
		}),
		defineField({
			name: 'price',
			title: 'Price',
			type: 'number',
			validation: Rule => Rule.required().positive(),
		}),
		defineField({
			name: 'discount',
			title: 'Discount Price',
			type: 'number',
		}),
		defineField({
			name: 'stock',
			title: 'Stock',
			type: 'number',
			validation: Rule => Rule.min(0),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'category' }] }],
		}),
		defineField({
			name: 'status',
			title: 'Status',
			type: 'string',
			options: {
				list: [
					{ title: 'New', value: 'new' },
					{ title: 'Hot', value: 'hot' },
					{ title: 'Sale', value: 'sale' },
				],
			},
		}),
		defineField({
			name: 'variant',
			title: 'Product Variant',
			type: 'string',
			options: {
				list: [
					{ title: 'T-shirt', value: 'tshirt' },
					{ title: 'Jacket', value: 'jacket' },
					{ title: 'Pants', value: 'pants' },
					{ title: 'Hoodie', value: 'hoodie' },
					{ title: 'Shorts', value: 'shorts' },
					{ title: 'Other', value: 'other' },
				],
			},
		}),
		defineField({
			name: 'images',
			title: 'Product Images',
			type: 'array',
			of: [{ type: 'image', options: { hotspot: true } }],
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'images',
			subtitle: 'price',
		},
		prepare(selection) {
			const { title, media, subtitle } = selection;
			const image = media && media[0] ? media[0] : null;
			return {
				title,
				subtitle: subtitle ? `$${subtitle}` : 'No price',
				media: image,
			};
		},
	},
});
