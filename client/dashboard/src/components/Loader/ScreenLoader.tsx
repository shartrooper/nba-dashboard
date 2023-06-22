import { Transition } from "@headlessui/react"
import { Spinner } from "../Elements/Spinner"
import { useEffect, useState } from "react"

const ScreenLoader = () => {
	const [isShowing, setIsShowing] = useState(false);

	useEffect(() => {
		setIsShowing(true);
		setTimeout(() => setIsShowing(false), 2000);
	}, []);

	return <Transition
		show={isShowing}
		enter="transition-opacity duration-100"
		enterFrom="opacity-0"
		enterTo="opacity-80"
		leave="transition-opacity duration-150"
		leaveFrom="opacity-80"
		leaveTo="opacity-0"
	>
		<div className="absolute inset-0 h-screen grid place-items-center bg-evening" >
			<Spinner size="xl" />
		</div>
	</Transition>
}

export default ScreenLoader;