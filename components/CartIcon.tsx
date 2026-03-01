"use client";

import useCartStore from '@/store';
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const CartIcon = () => {
	const { items } = useCartStore();
	return (
		<Link href='/cart' className='group relative'>
			<ShoppingBag className="h-5 w-5 group-hover:text-darkColor hoverEffect" />
			<span className="absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 text-[10px] font-semibold rounded-full flex items-center justify-center">{items.length ? items.length : 0}</span>
		</Link>
	)
}

export default CartIcon
