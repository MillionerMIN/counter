import type {ButtonHTMLAttributes, ReactNode} from 'react';

type UiButtonProps = {
	children: ReactNode 
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function UiButton({children, ...props}: UiButtonProps) {
	return <button className='bg-teal-400 hover:bg-teal-600 text-white py-2 px-4 border-rounded rounded-md' {...props}>{children}</button>
}