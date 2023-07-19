import { Spinner } from "@/components/Elements/Spinner";
import { TransitionWrapper } from "@/components/Loader";
import { chartLoaderSlice } from "@/store";

const ChartLoader = ({ loaderText }: { loaderText?: string }) => {
	const { chart } = chartLoaderSlice(state => state)
	return (<TransitionWrapper isShowing={chart}>
		<div className="absolute grid place-items-center text-center w-full" >
			<Spinner size="lg" />
			<span className="text-basketball-dim font-semibold" >{loaderText}</span>
		</div>
	</TransitionWrapper>);
}

export default ChartLoader;