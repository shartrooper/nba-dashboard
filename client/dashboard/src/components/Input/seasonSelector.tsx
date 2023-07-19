import { arrayRange } from "@/utils";
import { InputFieldProps } from "../Form"

type SelectorComponentProps = Pick<InputFieldProps, 'registration'> & { label: string }

const seasons = arrayRange(1979, new Date().getFullYear(), 1).reverse();

export function SeasonSelector({ registration, label }: SelectorComponentProps) {
	return (
		<div>
			<label className='block text-sm font-medium text-chalkboard mb-1'>
				{label}
			</label>
			<select className="text-midnight px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" {...registration} >
				{seasons.map(year =>
					<option key={year} value={year} >{year}</option>
				)}
			</select>
		</div>
	)
}