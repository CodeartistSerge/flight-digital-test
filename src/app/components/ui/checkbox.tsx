import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export default function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"w-[2rem] h-[2rem] border-text border-[2px] rounded-md",
				className
			)}
			{...props}
			>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<CheckIcon className="size-[1.8rem]" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	)
}