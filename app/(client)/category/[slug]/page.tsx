import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { getAllCategoriesQuery } from "@/sanity/helpers/queries";

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const categories = await getAllCategoriesQuery();

	// console.log('Fetched slug:', slug);
	// console.log('Fetched categories:', categories);

	return (
		<Container className="py-10">
			<Title className="text-xl">
				Products by Category
			</Title>
			<CategoryProducts categories={categories} slug={slug} />
		</Container>
	);
}

export default CategoryPage
