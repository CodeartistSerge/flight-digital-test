import { cn } from '@/lib/utils';

interface inputErrorProps {
	text?: string;
}

export default function InputError({ text, className = '', ...props }: React.ComponentProps<"input"> & inputErrorProps) {
    return text ? (
        <small className={cn(
			"text-red-600",
			className
		)} {...props}>
            {text}
        </small>
    ) : null;
}
