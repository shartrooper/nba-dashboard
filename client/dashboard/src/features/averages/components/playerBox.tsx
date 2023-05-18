import { Spinner } from "@/components/Elements/Spinner";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { ParsedAveragedPlayer } from "../types";

type Props = {
	player: ParsedAveragedPlayer,
	suggestions?: ParsedAveragedPlayer[],
	loading?: boolean,
	onInputChange: (query: string) => void,
	onSelectorChange?: (selected: ParsedAveragedPlayer, index?: number) => void
	itemIndex?: number
}

const PlayerComboBox = ({ suggestions, onInputChange, onSelectorChange, itemIndex, player, loading = false }: Props) => {
	const [selected, setSelected] = useState<ParsedAveragedPlayer>(player);
	const [query, setQuery] = useState<string>();

	const Options = ({ showLoader }: { showLoader: boolean }) => {
		if (showLoader) {
			return <Spinner />
		}

		return <>{!suggestions?.length ? (
			<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
				Nothing found.
			</div>
		) : (
			suggestions?.map(person => (
				<Combobox.Option
					key={person.id}
					className={({ active }) =>
						`relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-basketball-dim text-white' : 'text-gray-900'}`}
					value={person}
				>
					{({ selected, active }) => (
						<>
							<span
								className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
							>
								{person.firstName} {person.lastName}
							</span>
							{selected ? (
								<span
									className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
										}`}
								>
									<CheckIcon className="h-5 w-5" aria-hidden="true" />
								</span>
							) : null}
						</>
					)}
				</Combobox.Option>
			))
		)
		}</>

	}

	const handleSelection = (selectedPlayer: ParsedAveragedPlayer) => {
		setSelected(selectedPlayer);
		onSelectorChange && onSelectorChange(selectedPlayer, itemIndex);
	}

	useEffect(() => {
		const delayPlayerQuery = setTimeout(() => {
			query && onInputChange(query);
		}, 800);
		return () => clearTimeout(delayPlayerQuery)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	return (
		<Combobox value={selected} onChange={handleSelection}>
			<div className="relative mt-1 mb-6">
				<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
						displayValue={(player: ParsedAveragedPlayer) => `${player.firstName} ${player.lastName}`}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
						<ChevronUpDownIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						<Options showLoader={loading} />
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	)
}

export default PlayerComboBox;