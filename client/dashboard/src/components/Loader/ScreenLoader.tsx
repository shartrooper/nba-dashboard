import { Spinner } from "../Elements/Spinner"
import { screenLoaderSlice } from "@/store"
import { TransitionWrapper } from "./TransitionWrapper";

const ScreenLoader = () => {
	const { main } = screenLoaderSlice(state => state);
	return <TransitionWrapper isShowing={main}
	>
		<div className="absolute inset-0 h-screen grid place-items-center bg-evening" >
			<Spinner size="xl" />
		</div>
	</TransitionWrapper>
}

export default ScreenLoader;