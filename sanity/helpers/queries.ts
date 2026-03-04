import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../lib/live';

/**
 * Fetches a product from Sanity based on its slug.
 * @param slug - The slug of the product to fetch
 * @returns The product data or null if not found
 */
export const getProductBySlugQuery = async (slug: string) => {
	const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type=="product" && slug.current == $slug][0]`);
	try {
		const product = await sanityFetch({
			query: PRODUCT_BY_SLUG_QUERY,
			params: { slug },
		});
		return product.data || null;
	} catch (error) {
		console.error('Error fetching product by slug:', error);
		return null;
	}
};

/**
 * Fetches all categories from Sanity, ordered by title in ascending order.
 * @returns An array of category data or an empty array if none found
 */
export const getAllCategoriesQuery = async () => {
	const CATEGORIES_QUERY = defineQuery(`*[_type=="category"] | order(title asc)`);
	try {
		const categories = await sanityFetch({
			query: CATEGORIES_QUERY,
		});
		return categories.data || [];
	} catch (error) {
		console.error('Error fetching categories:', error);
		return [];
	}
};

export const getClientOrdersQuery = async (clerkUserId: string) => {
	if (!clerkUserId) {
		throw new Error('Clerk user ID is required to fetch orders');
	}

	const CLIENT_ORDERS_QUERY =
		defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
		...,products[]{
			...,product->
		}
	}`);

	try {
		const orders = await sanityFetch({
			query: CLIENT_ORDERS_QUERY,
			params: { userId: clerkUserId },
		});
		return orders.data || [];
	} catch (error) {
		console.error('Error fetching client orders:', error);
		return [];
	}
};
