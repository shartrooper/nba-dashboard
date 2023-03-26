import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export type Props = {
	description: string
}


export function DropdownWrapper({ children, description }: React.PropsWithChildren<Props>) {
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button className="
						flex w-full 
						justify-between rounded-lg 
						bg-basketball-dim px-4 py-2 
						text-left text-sm 
						font-medium text-chalkboard 
						hover:bg-basketball
						focus:outline-none focus-visible:ring 
						focus-visible:ring-opacity-75
						">
						<p className='truncate pr-4'>{description}</p>
						<ChevronUpIcon
							className=
							{`${open ? 'rotate-180 transform' : ''} h-6 w-6 text-chalkboard`}
						/>
					</Disclosure.Button>
					<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
						{children}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
