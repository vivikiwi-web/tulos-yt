import { cn } from "@/lib/utils";

interface Props {
	children: React.ReactNode;
	className?: string;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * A reusable title component that renders different heading levels.
 * @param param Props for the Title component
 * @returns A heading element with the specified level and styles
 * 
 * Example usage:
 * <Title tag="h1" className="text-4xl">This is a Title</Title>
 * This will render an <h1> element with the text "This is a Title" and the specified styles.
 * 
 * Default tag is 'h2' if not specified.
 * 
 * Default styles include: text-2xl font-semibold
 */
const Title = ({ children, className, tag = 'h2' }: Props) => {
	const Tag = tag;

	return (
		<Tag className={cn("text-2xl font-semibold", className)}>
			{children}
		</Tag>
	)
}

export default Title
