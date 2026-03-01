import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../lib/live';

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
