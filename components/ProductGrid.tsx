'use client';

import { useEffect, useState } from 'react';
import HomeTabBar from '@/components/HomeTabBar';
import { productType } from '@/constants';
import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';
import ProductCard from './ProductCard';
import NoProductsAvailable from './NoProductsAvailable';
import ProductSkeleton from './ProductSkeleton';
import { AnimatePresence, motion } from 'motion/react';

const ProductGrid = () => {
	const [selectedTab, setSelectedTab] = useState<string>(productType[0]?.value || "");
	const [products, setProducts] = useState<Product[]>([]); // Replace 'any' with your product type
	const [loading, setLoading] = useState<boolean>(false);
	// *[_type == 'product' && variant == 'jacket'] | order(name asc)
	const query = `*[_type == "product" && variant == $variant] | order(name asc)`;
	const params = { variant: selectedTab.toLocaleLowerCase() };
	const skeletonCount = products.length || 4;

	// Fetch products based on selected tab
	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const response = await client.fetch(query, params);
				setProducts(await response);
			} catch (error) {
				console.error('Error fetching products:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, [selectedTab]);

	return (
		<div className='mt-10 flex flex-col items-center'>
			<HomeTabBar
				selectedTab={selectedTab}
				onTabSelect={setSelectedTab}
			/>
			{loading ? (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
					{Array.from({ length: skeletonCount }).map((_, index) => (
						<ProductSkeleton key={index} />
					))}
				</div>
			) : (
				products.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
						{products.map((product) => (
							<AnimatePresence key={product._id} >
								<motion.div
									initial={{ opacity: 0.2 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<ProductCard product={product} />
								</motion.div>
							</AnimatePresence>
						))}
					</div>
				) : (
					<NoProductsAvailable selectedTab={selectedTab} />
				)
			)}
		</div>
	);
};

export default ProductGrid;
