import { cn } from "@/lib/utils"

export default function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		<label
			data-slot="label"
			className={cn(
				"",
				className
			)}
			{...props}
		/>
	)
}