import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Product } from "@/sanity.types";

interface Props {
	product: Product;
	className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
	const isOutOfStock = product?.stock === 0;
	return (
		<div className="w-full h-12 flex items-center">
			<Button
				disabled={isOutOfStock}
				className={cn(
					"w-full bg-transparent text-darkColor cursor-pointer shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect", className)}
			>
				Add to cart
			</Button>
		</div>
	)
}

export default AddToCartButton;