import { Spinner } from "@/components/Elements/Spinner";
import { TransitionWrapper } from "@/components/Loader";
import { chartLoaderSlice } from "@/store";

const ChartLoader = () => {
	const { chart } = chartLoaderSlice(state => state)
	return (<TransitionWrapper isShowing={chart}>
		<div className="absolute grid place-items-center text-center w-full" >
			<Spinner size="lg" />
			<span className="text-basketball-dim font-semibold" >Building chart...</span>
		</div>
	</TransitionWrapper>);
}

export default ChartLoader;