import { Metadata } from "next";

interface Props {
	children: React.ReactNode
}


export const metadata: Metadata = {
	title: "Tulos Studio - Build your ecommerce store with ease",
	description: "Tulos Studio is a powerful ecommerce store builder that allows you to create and manage your online store with ease. With Tulos Studio, you can customize your store's design, manage your products, and track your sales all in one place.",
};

const RootLayout = ({ children }: Props) => {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	)
}

export default RootLayout
