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
