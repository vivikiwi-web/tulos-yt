'use client';

import { headerData } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderMenu = () => {
	const pathname = usePathname();

	return (
		<div className='hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold'>
			{headerData.map(item => (
				<Link
					key={item?.title}
					href={item?.href}
					className={`hover:text-darkColor hoverEffect cursor-pointer relative group ${pathname === item?.href ? 'text-darkColor' : ''}`}
				>
					{item?.title}
					<span
						className={`absolute left-1/2 -bottom-0.5 w-0 h-px bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname === item.href ? 'w-1/2 left-0' : ''}`}
					/>
					<span
						className={`absolute right-1/2 -bottom-0.5 w-0 h-px bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname === item.href ? 'w-1/2 right-0' : ''}`}
					/>
				</Link>
			))}
		</div>
	);
};

export default HeaderMenu;
