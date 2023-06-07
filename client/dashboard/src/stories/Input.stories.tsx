import Input, { InputProps } from '@/components/Input/generic';
import { Meta, Story } from '@storybook/react';
const meta: Meta = {
	title: 'Components/GenericInput',
	component: Input,
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;

const Template: Story<InputProps> = (args) => <Input {...args} />

export const DatePicker = Template.bind({});
export const Search = Template.bind({});

DatePicker.args = { type: 'date', onChange: (e) => alert(e.target.value)  };
Search.args = { type: 'search' }