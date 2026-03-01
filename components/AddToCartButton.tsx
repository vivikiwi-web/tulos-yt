import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Product } from "@/sanity.types";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface Props {
	product: Product;
	className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
	const itemCount = 0; // Replace with actual item count from cart state
	const isOutOfStock = product?.stock === 0;

	return (

		<div className="w-full h-12 flex items-center">
			{itemCount ? (
				<div className="w-full text-sm">
					<div className="flex items-center justify-between">
						<span className="text-xs text-muted-foreground">Quantity</span>
						<QuantityButtons product={product} />
					</div>
					<div className="flex items-center justify-between border-t pt-1">
						<span className="text-xs font-semibold">Subtotal</span>
						<PriceFormatter
							amount={product?.price ? product?.price * itemCount : 0}
						/>
					</div>
				</div>
			) : (
				<Button
					disabled={isOutOfStock}
					className={
						cn(
							"w-full bg-transparent text-darkColor cursor-pointer shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect", className)}
				>
					Add to cart
				</Button>
			)
			}
		</div >
	)
}

export default AddToCartButton;