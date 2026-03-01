"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import NoProductsAvailable from "./NoProductsAvailable";
import { Category, Product } from "@/sanity.types";

interface Props {
	categories: Category[];
	slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
	const router = useRouter();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const skeletonCount = products.length || 8;

	const handleCategoryClick = (categorySlug: string) => {
		if (categorySlug === slug) return;
		router.push(`/category/${categorySlug}`);
	};

	const fetchProductsByCategory = async (categorySlug: string) => {
		setLoading(true);
		try {
			const query = `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`;
			const response = await client.fetch(query, { categorySlug });

			setProducts(response);
		} catch (error) {
			console.error('Error fetching products:', error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (slug) {
			fetchProductsByCategory(slug);
		}
	}, [slug]);

	return (
		<div className="py-5 flex flex-col md:flex-row items-start gap-5">
			<div className="flex flex-col md:min-w-40 border">
				{categories.map((category) => (
					<Button
						key={category._id}
						className={`bg-transparent border-0 rounded-none cursor-pointer text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${category?.slug?.current === slug && "bg-darkColor text-white border-darkColor"}`}
						onClick={() => handleCategoryClick(category?.slug?.current as string)}
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
							<NoProductsAvailable
								selectedTab={slug}
								className="mt-0 w-full"
							/>
						)}
					</>
				)}
			</div>
		</div >
	)
};
export default CategoryProducts
