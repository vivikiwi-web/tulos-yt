import { contactData } from "@/constants";

interface Props {
	title: string;
	subtitle: string;
	icon: React.ComponentType<{ className?: string }>;
}

const data: Props[] = contactData;

const FooterTop = () => {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
			{data?.map((item, index) => (
				<ContactItem
					key={index}
					icon={item?.icon}
					title={item?.title}
					subtitle={item?.subtitle}
				/>
			))}
		</div>
	);
};

const ContactItem = ({ icon, title, subtitle }: Props) => {
	const Icon = icon;

	return (
		<div className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors">
			<Icon className="text-gray-600 group-hover:text-darkColor transition-colors" />
			<div>
				<h3 className="font-semibold text-gray-900 group-hover:text-darkColor transition-colors">
					{title}
				</h3>
				<p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 transition-colors">
					{subtitle}
				</p>
			</div>
		</div>
	);
};

export default FooterTop;