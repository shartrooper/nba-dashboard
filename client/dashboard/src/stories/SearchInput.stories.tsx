import { Meta, Story } from '@storybook/react';
import SearchInput from '@/components/search/searchInput';

const meta: Meta = {
	title: 'Search Input',
	component: SearchInput,
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;

type SearchInputProps = {
	cb: (key?: string) => void,
	placeholder?: string
}

const Template: Story<SearchInputProps> = (props) =>
	<div className="my-8">
		<SearchInput {...props} />
	</div>

export const StandaloneSearchInput = Template.bind({});
StandaloneSearchInput.args = {
	cb: () => null,
	placeholder: "Placeholder text..."
}