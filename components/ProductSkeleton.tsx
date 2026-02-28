import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
	return (
		<div className="group text-sm rounded-lg overflow-hidden">
			<div className="bg-linear-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative">
				<Skeleton className="w-full h-72 rounded-none" />
			</div>
			<div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none">
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-7 w-1/3 mt-1" />
				<div className="w-full h-12 flex items-center">
					<Skeleton className="h-9 w-full mt-2" />
				</div>
			</div>
		</div>
	);
};

export default ProductSkeleton;