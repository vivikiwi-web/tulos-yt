"use client"

import { useState } from "react"
import { AlignLeft } from "lucide-react"
import Sidebar from "./Sidebar"

const MobileMenu = () => {
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
				<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
			</div>
		</>
	)
}

export default MobileMenu
