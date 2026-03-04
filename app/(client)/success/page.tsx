import { redirect } from "next/navigation";
import SuccessContent from "./SuccessContent";

interface Props {
	searchParams: Promise<{ session_id?: string; orderNumber?: string }>;
}

const SuccessPage = async ({ searchParams }: Props) => {
	const { session_id, orderNumber } = await searchParams;

	if (!session_id || !orderNumber) {
		redirect("/");
	}

	return <SuccessContent orderNumber={orderNumber} />;
};

export default SuccessPage;
