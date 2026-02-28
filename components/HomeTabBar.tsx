import { productType } from "@/constants";
import { cn } from "@/lib/utils";
import { Repeat } from "lucide-react";

interface Props {
	selectedTab?: string;
	onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {

	return (
		<div className="flex items-center gap-1.5 text-sm font-semibold">
			<div className="flex items-center gap-1.5">
				{productType.map((item) => (
					<button
						key={item.value}
						onClick={() => onTabSelect(item.value)}
						className={cn(`productTab`, selectedTab === item.value ? 'bg-darkColor text-white' : '')}
					>
						{item.title}
					</button>
				))}
			</div>
			{/* <button className={cn('productTab', 'p-2')}>
				<Repeat className="w-5 h-5" />
			</button> */}
		</div>
	);
};

export default HomeTabBar;
