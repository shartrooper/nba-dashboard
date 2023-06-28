import { Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";

export const TransitionWrapper: React.FC<PropsWithChildren<{ isShowing: boolean }>> = ({ isShowing, children }) => {
	return <Transition
		show={isShowing}
		enter="transition-opacity duration-100"
		enterFrom="opacity-0"
		enterTo="opacity-90"
		leave="transition-opacity duration-150"
		leaveFrom="opacity-90"
		leaveTo="opacity-0"
	>
		{children}
	</Transition>
}