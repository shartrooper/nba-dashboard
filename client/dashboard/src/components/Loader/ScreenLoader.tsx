import { Spinner } from "../Elements/Spinner"
import { useScreenLoaderStore } from "@/store"
import { TransitionWrapper } from "./TransitionWrapper";

const ScreenLoader = () => {
	const { isShowing } = useScreenLoaderStore(state => state);
	return <TransitionWrapper isShowing={isShowing.main}
	>
		<div className="absolute inset-0 h-screen grid place-items-center bg-evening" >
			<Spinner size="xl" />
		</div>
	</TransitionWrapper>
}

export default ScreenLoader;