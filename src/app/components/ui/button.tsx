import { type ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge'
import type { InertiaLinkProps } from '@inertiajs/react';

const buttonVariants = cva([
	'bg-accent',
	'rounded-full',
	'py-4',
	'px-8',
	'xl:py-6',
	'xl:px-10',
	'text-white',
	'text-[1.4rem]',
	'xl:text-[2rem]',
	'shadow-md',
	'not-disabled:cursor-pointer',
	'hover:not-disabled:brightness-95',
	'transition-all',
	'duration-300',
	'font-["Poppins",sans-serif]',
	'font-semibold',
	'no-underline!',
	'disabled:opacity-50',
	'brightness-100'
], {
	variants: {
		size: {
			regular: [],
			large: [],
			small: [
				'py-[0.5em]! px-[1.5em]!',
				'text-[1.65rem]! font-regular'
			],
			icon: [
				'py-[0.5em]! px-[0.5em]!',
				'w-[2em]! h-[2em]!',
				'leading-[1em]!',
				'flex',
				'items-center',
				'justify-center',
			],
		},
		mod: {
			regular: [],
			transparent: [
				'bg-transparent',
				'border',
				'border-accent',
				'text-accent',
				'hover:not-disabled:bg-accent/10',
			],
			outline: [
				'bg-transparent',
				'border',
				'border-text',
				'text-text',
				'hover:not-disabled:bg-accent/10',
			],
			white: [
				'bg-white',
				'border',
				'border-accent',
				'text-accent',
				'hover:not-disabled:bg-white/90',
			],
			highlight: [
				'bg-highlight',
				'border',
				'border-highlight',
				'text-white',
			],
		},
		purpose: {
			regular: [],
			header: [
				'py-0!',
				'leading-[2em]',
				'h-[2.2em]',
				'font-["Raleway",sans-serif]',
				// 'font-normal',
			],
		}
	},
	defaultVariants: {
		size: 'regular',
		purpose: 'regular',
		mod: 'regular',
	},
});

interface buttonProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement> | React.MouseEventHandler<HTMLLinkElement>;
	children?: ReactNode;
	classNamme?: string;
	size?: VariantProps<typeof buttonVariants>['size'];
	purpose?: VariantProps<typeof buttonVariants>['purpose'];
	mod?: VariantProps<typeof buttonVariants>['mod'];
}

export function LinkButton({ children, size, purpose, mod, className = '', ...props }: InertiaLinkProps & buttonProps) {
	return <Link {...props} className={twMerge(buttonVariants({ size, purpose, mod }), className)}>{children}</Link>
}

export default function Button({ onClick, children, size, purpose, mod, className = '', ...props }: React.ComponentProps<"button"> & buttonProps) {
	return (
		<button {...props} className={twMerge(buttonVariants({ size, purpose, mod }), className)} onClick={onClick}>{children}</button>
	)
}