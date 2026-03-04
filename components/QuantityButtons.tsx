import { Product } from "@/sanity.types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import useCartStore from "@/store";
import toast from "react-hot-toast";

interface Props {
	product: Product;
	className?: string;
}
const QuantityButtons = ({ product, className }: Props) => {
	const { addItem, removeItem, getItemCount } = useCartStore();
	const isOutOfStock = product?.stock === 0;
	const itemCount = getItemCount(product._id);

	const handleRemoveProduct = () => {
		removeItem(product._id);

		if (itemCount === 1) {
			toast.success(`${product?.name?.substring(0, 20)}... removed from cart`);
		} else {
			toast.success(`Decreased quantity of ${product?.name?.substring(0, 20)}...`);
		}
	}

	const handleAddProduct = () => {
		addItem(product);
		toast.success(`${product?.name?.substring(0, 20)}... added to cart`);
	}

	return (
		<div className={cn("flex items-center gap-1 text-base pb-1", className)}>
			<Button
				disabled={itemCount === 0 || isOutOfStock}
				variant="outline"
				size="icon"
				className="w-6 h-6 cursor-pointer"
				onClick={handleRemoveProduct}
			>
				<Minus />
			</Button>
			<span className="font-semibold w-8 text-center text-darkColor">
				{itemCount}
			</span>
			<Button
				disabled={isOutOfStock || itemCount >= (product.stock || 0)}
				variant="outline"
				size="icon"
				className="w-6 h-6 cursor-pointer"
				onClick={handleAddProduct}
			>
				<Plus />
			</Button>
		</div>
	);
};

export default QuantityButtons;