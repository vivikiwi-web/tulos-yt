"use client";

import { useState } from "react";
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Props {
	images?: Product['images'];
}

const ImageView = ({ images }: Props) => {
	const [active, setActive] = useState(images?.[0] || null);

	return (
		<div className="w-full md:w-1/2 space-y-2 md:space-y-4">
			<AnimatePresence mode="wait">
				<motion.div
					key={active?._key}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="w-full max-h-137.5 min-h-112.5 border border-darkColor/10 rounded-md group overflow-hidden"
				>
					<Image
						src={urlFor(active).url()}
						alt={"Product Image"}
						width={700}
						height={700}
						priority
						className="w-full h-96 max-h-137.5 min-h-112.5 object-contain group-hover:scale-110 hoverEffect rounded-md"
					/>
				</motion.div>
			</AnimatePresence>
			<div className="grid grid-cols-6 gap-2 h-20 md:h-28">
				{images?.map((image) => (
					<button
						onClick={() => setActive(image)}
						key={image?._key}
						className={`border cursor-pointer rounded-md overflow-hidden ${active?._key === image?._key ? "ring-1 ring-darkColor" : ""}`}
					>
						<Image
							src={urlFor(image).url()}
							alt="productImage"
							width={100}
							height={100}
							className="w-full h-auto object-contain"
						/>
					</button>
				))}
			</div>
		</div>
	)
}

export default ImageView
