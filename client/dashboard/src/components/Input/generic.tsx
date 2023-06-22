import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import React from "react"

const icons: { [key: string]: JSX.Element } = {
	search: <MagnifyingGlassCircleIcon className="w-6 h-6" />,
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
		<label htmlFor="generic-form" className="block text-sm font-medium text-chalkboard">Input {type}</label>
		<div className="relative mt-1 rounded-md shadow-sm text-midnight">
			{icons[type] && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
				{icons[type]}
			</div>}
			<input
				type={InputTypes[type]}
				id="generic-form"
				name="generic"
				className={clsx(padding[type], "block rounded-md border-gray-300 py-2 focus:outline-none focus:ring focus:ring-basketball sm:text-sm")}
				{...props}
			/>
		</div>
	</div>
}

export default Input;

