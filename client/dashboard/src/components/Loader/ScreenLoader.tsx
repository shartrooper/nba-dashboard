import { Transition } from "@headlessui/react"
import { Spinner } from "../Elements/Spinner"
import { useScreenLoaderStore } from "@/store"

const ScreenLoader = () => {
	const { isShowing } = useScreenLoaderStore(state => state);
	return <Transition
		show={isShowing}
		enter="transition-opacity duration-100"
		enterFrom="opacity-0"
		enterTo="opacity-90"
		leave="transition-opacity duration-150"
		leaveFrom="opacity-90"
		leaveTo="opacity-0"
	>
		<div className="absolute inset-0 h-screen grid place-items-center bg-evening" >
			<Spinner size="xl" />
		</div>
	</Transition>
}

export default ScreenLoader;