import clsx from "clsx"
import React from "react"

const icons: { [key: string]: JSX.Element } = {
	search: (
		<span className="text-gray-500 sm:text-sm">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</span>
	)
}

enum InputTypes {
	search = 'text',
	date = 'date'
}

export type InputProps = {
	type?: 'search' | 'date',
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
}

const Input = ({ type = 'search', onChange, placeholder = "input text..." }: InputProps) => {
	const props = { onChange, placeholder };
	const padding = {
		search: 'pl-7 pr-12',
		date: 'px-3'
	}
	return <div>
		<label htmlFor="generic" className="block text-sm font-medium">Input {type}</label>
		<div className="relative mt-1 rounded-md shadow-sm text-midnight">
			{icons[type] && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
				{icons[type]}
			</div>}
			<input
				type={InputTypes[type]}
				name="generic"
				className={clsx(padding[type], "block rounded-md border-gray-300 py-2 focus:outline-none focus:ring focus:ring-basketball sm:text-sm")}
				{...props}
			/>
		</div>
	</div>
}

export default Input;

