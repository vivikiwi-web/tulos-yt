import { useRequiredUser } from '@/hooks/useRequiredUser';

const OrdersPage = async () => {
	await useRequiredUser();

	return (
		<div>
			OrdersPage
		</div>
	)
}

export default OrdersPage
