import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-28';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
	console.error(
		'Missing env vars. Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN'
	);
	process.exit(1);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	token,
	useCdn: false,
});

const productsInput = [
	{ title: "Men's Bamboo T-Shirts Crewneck Undershirt", price: 30, image: '14.webp' },
	{ title: 'Loose Hoodie Sweatshirt For Girls Boys', price: 240.0, image: '15.webp' },
	{ title: 'Jeans for Men Stretch Slim Fit Denim Comfort', price: 240.0, image: '16.webp' },
	{ title: 'Cotton T Shirts for Women Loose Fit Casual', price: 83.0, image: '17.webp' },
	{ title: 'Champion Boys Zip Front Fleece Hoodie', price: 138.0, image: '18.webp' },
	{ title: 'Casual Fall Winter Warm Padded Coats Outwear', price: 132.0, image: '19.webp' },
	{ title: "Carhart Men's Relaxed Fit Washed Duck Sherpa", price: 458.0, image: '20.webp' },
	{ title: "Boys' Zip-Up Sweatshirt", price: 189.0, image: '21.webp' },
	{ title: 'Boys', price: 99.99, image: '22.webp' },
	{ title: "Athletic Men's Short Sleeve Performance T-Shirt", price: 69.0, image: '23.webp' },
	{ title: 'Adult Ultra Cotton T-Shirt, Style G2000, Multipack', price: 37.0, image: '24.webp' },
];

const categoryMap = {
	men: {
		title: "Men's Fashion",
		description: 'Comfort-focused and modern menswear essentials.',
	},
	women: {
		title: "Women's Fashion",
		description: 'Everyday women styles with comfort and versatility.',
	},
};

function slugify(value) {
	return value
		.toLowerCase()
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 96);
}

function makeKey() {
	return Math.random().toString(36).slice(2, 11);
}

function detectVariant(title) {
	const t = title.toLowerCase();
	if (t.includes('hoodie') || t.includes('sweatshirt')) return 'hoodie';
	if (t.includes('jean') || t.includes('denim') || t.includes('pant')) return 'pants';
	if (t.includes('jacket') || t.includes('coat') || t.includes('outwear') || t.includes('sherpa'))
		return 'jacket';
	if (t.includes('short')) return 'shorts';
	if (
		t.includes('t-shirt') ||
		t.includes('t shirt') ||
		t.includes('tee') ||
		t.includes('undershirt')
	)
		return 'tshirt';
	return 'other';
}

function detectCategoryKey(title) {
	const t = title.toLowerCase();
	if (t.includes('women')) return 'women';
	if (t.includes('t-shirt') || t.includes('tshirt') || t.includes('shirt')) return 't-shirt';
	if (t.includes('men') || t.includes("men's")) return 'men';
	return 'others';
}

function detectStatus(index, price) {
	if (index < 4) return 'new';
	if (price >= 180) return 'hot';
	return 'sale';
}

function makeIntro(title) {
	return `Stylish ${title.toLowerCase()} made for daily comfort and versatile wear.`;
}

function makeDescription(title, variant) {
	return `${title} offers a comfortable fit, reliable quality, and an easy-to-style look. This ${variant} piece is suitable for casual everyday wear and seasonal layering.`;
}

async function ensureCategoryDocs() {
	const ids = {};

	for (const [key, value] of Object.entries(categoryMap)) {
		const slug = slugify(value.title);
		const id = `category-${slug}`;

		await client.createOrReplace({
			_id: id,
			_type: 'category',
			title: value.title,
			slug: { current: slug },
			description: value.description,
		});

		ids[key] = id;
	}

	return ids;
}

async function uploadImage(filePath, fileName) {
	if (!fs.existsSync(filePath)) {
		throw new Error(`Missing image file: ${filePath}`);
	}

	const imageBuffer = fs.readFileSync(filePath);
	return client.assets.upload('image', imageBuffer, {
		filename: fileName,
		contentType: 'image/webp',
	});
}

async function run() {
	console.log('Ensuring category documents...');
	const categoryIds = await ensureCategoryDocs();

	const imagesDir = path.join(process.cwd(), 'public', 'dammy-products');

	console.log('Importing products...');
	for (const [index, item] of productsInput.entries()) {
		const slug = slugify(item.title);
		const variant = detectVariant(item.title);
		const categoryKey = detectCategoryKey(item.title);
		const status = detectStatus(index, item.price);
		const intro = makeIntro(item.title);
		const description = makeDescription(item.title, variant);

		const imagePath = path.join(imagesDir, item.image);
		const imageAsset = await uploadImage(imagePath, item.image);

		const doc = {
			_id: `product-${slug}`,
			_type: 'product',
			name: item.title,
			slug: { current: slug },
			intro,
			description,
			price: item.price,
			discount: null,
			stock: 50,
			variant,
			status,
			category: [
				{
					_key: makeKey(),
					_type: 'reference',
					_ref: categoryIds[categoryKey],
				},
			],
			images: [
				{
					_key: makeKey(),
					_type: 'image',
					asset: {
						_type: 'reference',
						_ref: imageAsset._id,
					},
				},
			],
		};

		await client.createOrReplace(doc);
		console.log(`✓ Imported: ${item.title}`);
	}

	console.log('Done. Products imported successfully.');
}

run().catch(error => {
	console.error('Import failed:', error.message);
	process.exit(1);
});
