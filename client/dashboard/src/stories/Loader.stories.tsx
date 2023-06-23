import { Button } from "@/components/Elements/Button";
import ScreenLoader from "@/components/Loader";
import { useScreenLoaderStore } from "@/store";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
	title: 'Screen Loader',
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;


const MockScreenLoader = () => {
	const { toggle } = useScreenLoaderStore(state => state);

	const handleClick = () => {
		toggle(true);
		setTimeout(() => {
			toggle(false);
		}, 2000);
	}

	return <>
		<Button onClick={handleClick} >
			Toggle Loader
		</Button>
		<ScreenLoader />
	</>
}


const Template: Story = () => <MockScreenLoader />

export const Main = Template.bind({});