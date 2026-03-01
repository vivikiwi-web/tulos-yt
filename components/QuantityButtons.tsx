import { Product } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface Props {
	product: Product;
	className?: string;
}
const QuantityButtons = ({ product, className }: Props) => {
	const isOutOfStock = product?.stock === 0;
	const itemCount = 4; // Replace with actual item count from cart state

	return (
		<div className={cn("flex items-center gap-1 text-base pb-1", className)}>
			<Button
				disabled={itemCount === 0 || isOutOfStock}
				variant="outline"
				size="icon"
				className="w-6 h-6"
			>
				<Minus />
			</Button>
			<span className="font-semibold w-8 text-center text-darkColor">
				{itemCount}
			</span>
			<Button
				variant="outline"
				size="icon"
				className="w-6 h-6"
			>
				<Plus />
			</Button>
		</div>
	);
};

export default QuantityButtons;