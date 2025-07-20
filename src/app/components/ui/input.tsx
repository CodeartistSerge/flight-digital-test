import { cn } from "@/lib/utils"

export default function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
	<input
		type={type}
		className={cn(
			"border-[2px] border-text rounded-2xl outline-0",
			"px-[2rem] py-0",
			"h-[2.5em] leading-[2.5em]",
			className
		)}
		{...props}
	/>
  )
}