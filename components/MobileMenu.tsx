"use client"

import { useState } from "react"
import { AlignLeft } from "lucide-react"
import { Category } from '@/sanity.types';
import Sidebar from "./Sidebar"

type Props = {
	categories?: Category[];
}

const MobileMenu = ({ categories }: Props) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<>

			<div className="">
				<AlignLeft className="hover:text-darkColor hoverEffect md:hidden cursor-pointer" onClick={toggleSidebar} />
			</div>
			<div>
				<Sidebar categories={categories} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
			</div>
		</>
	)
}

export default MobileMenu
