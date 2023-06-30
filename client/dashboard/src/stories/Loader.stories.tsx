import { Button } from "@/components/Elements/Button";
import { Spinner } from "@/components/Elements/Spinner";
import ScreenLoader, { TransitionWrapper } from "@/components/Loader";
import { LoadersUnion, screenLoaderSlice, chartLoaderSlice } from "@/store";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
	title: 'Screen Loader',
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;

type Prop = { loaderType: LoadersUnion }



const MockChartLoader = () => {
	const { chart } = chartLoaderSlice(state => state);
	return <TransitionWrapper isShowing={chart}
	>
		<div className="absolute inset-0 h-screen grid place-items-center bg-evening" >
			<Spinner size="xl" /> LoadingChart
		</div>
	</TransitionWrapper>
}


const MockScreenLoader: React.FC<Prop> = ({ loaderType }) => {
	const { toggle: toggleMain } = screenLoaderSlice(state => state);
	const { toggle: toggleChart } = chartLoaderSlice(state => state);

	const handleClick = (loaderFn: typeof toggleMain) => {
		loaderFn(true);
		setTimeout(() => {
			loaderFn(false);
		}, 2000);
	}

	return <>
		<Button onClick={() => handleClick(loaderType === 'main' ? toggleMain : toggleChart)} >
			Toggle Loader {loaderType}
		</Button>
		{loaderType === 'main' && <ScreenLoader />}
		{loaderType === 'chart' && <MockChartLoader />}
	</>
}


const Template: Story<Prop> = (args) => <MockScreenLoader {...args} />

export const MainLoader = Template.bind({});

MainLoader.args = { loaderType: "main" };

export const ChartLoader = Template.bind({});

ChartLoader.args = { loaderType: "chart" }