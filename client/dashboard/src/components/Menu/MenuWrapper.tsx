import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';


type MenuWrapperProps = {
	menuButton: JSX.Element,
	items: JSX.Element,
	classes?: {
		menu?: string,
		items?: string
	}
}

export const MenuWrapper = ({
	menuButton,
	items,
	classes
}: PropsWithChildren<MenuWrapperProps>) => {

	return (
		<Menu as="div" className="relative">
			<Menu.Button className={clsx("inline-flex justify-center items-center hover:bg-basketball p-2", classes?.menu)}>
				{menuButton}
			</Menu.Button>
			<Transition
				enter-active-class="transition duration-100 ease-out transform"
				enter-from-class="opacity-0 scale-90"
				enter-to-class="opacity-100 scale-100"
				leave-active-class="transition duration-100 ease-in transform"
				leave-from-class="opacity-100 scale-100"
				leave-to-class="opacity-0 scale-90"
			>
				<Menu.Items className={clsx("overflow-hidden absolute right-0 bg-midnight mt-2 w-48 rounded-md border border-chalkboard shadow-lg origin-top-right focus:outline-none", classes?.items)}>
					{items}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
