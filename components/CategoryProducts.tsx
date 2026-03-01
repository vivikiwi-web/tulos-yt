"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Category, Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

interface Props {
	categories: Category[];
	slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
	const [currentSlug, setCurrentSlug] = useState(slug);
	const [products, setProducts] = useState([]); // Replace 'any' with your product type
	const [loading, setLoading] = useState(false);
	const skeletonCount = products.length || 8;

	const fetchProductsByCategory = async (categorySlug: string) => {
		setLoading(true);
		try {
			const query = `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`;
			const params = { categorySlug };
			const response = await client.fetch(query, params);

			setProducts(response);
		} catch (error) {
			console.error('Error fetching products:', error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (currentSlug) {
			fetchProductsByCategory(currentSlug);
		}
	}, [currentSlug]);

	console.log('Current Slug:', currentSlug);
	console.log('Products:', products);

	return (
		<div className="py-5 flex flex-col md:flex-row items-start gap-5">
			<div className="flex flex-col md:min-w-40 border">
				{categories.map((category) => (
					<Button
						key={category._id}
						className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${category?.slug?.current === currentSlug && "bg-darkColor text-white border-darkColor"}`}
						onClick={() => setCurrentSlug(category?.slug?.current as string)}
					>
						{category.title}
					</Button>
				))}
			</div>
			<div className="w-full">
				{loading ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
						{Array.from({ length: skeletonCount }).map((_, index) => (
							<ProductSkeleton key={index} />
						))}
					</div>
				) : (
					<>
						{products?.length > 0 ? (
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
								{products.map((product: Product) => (
									<AnimatePresence key={product._id} >
										<motion.div
											layout
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
							<div className="text-center text-gray-500">No products found.</div>
						)}
					</>
				)}
			</div>
		</div >
	)
};
export default CategoryProducts
