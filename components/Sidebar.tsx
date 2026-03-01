import { FC } from "react";
import { motion } from "motion/react"
import Logo from "./Logo";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import { Category } from "@/sanity.types";

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
	categories?: Category[];
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, categories }) => {
	const pathname = usePathname();
	return (
		<>
			<div onClick={onClose} className={`fixed left-0 top-0 z-50 bg-darkColor/50 shadow-xl hoverEffect w-full h-full ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.3 }}
				className={`fixed inset-y-0 left-0 z-55 min-w-72 max-w-96 h-full bg-darkColor text-white/70 p-10 border-r border-r-white flex flex-col gap-6 hoverEffect ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
			>
				<div className="flex items-center justify-between">
					<button onClick={onClose}><Logo className="text-white">Tulos</Logo></button>
					<button onClick={onClose} className="cursor-pointer"><X /></button>
				</div>
				<div className='flex flex-col gap-3.5 text-base capitalize font-semibold tracking-wide'>
					{categories?.map(category => (
						<Link
							onClick={onClose}
							key={category?._id}
							href={`/category/${category?.slug?.current}`}
							className={`hover:text-white hoverEffect cursor-pointer ${pathname === `/category/${category?.slug?.current}` ? 'text-white' : ''}`}
						>
							{category?.title}
						</Link>
					))}
				</div>
				<SocialMedia />
			</motion.div>
		</>
	)
}

export default Sidebar
