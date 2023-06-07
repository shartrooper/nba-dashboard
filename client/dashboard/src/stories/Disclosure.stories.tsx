import { Meta, Story } from '@storybook/react';
import { DropdownWrapper, Props } from '@/components/Disclosure'


const meta: Meta = {
	title: 'Components/Dropdown',
	component: DropdownWrapper,
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;

const Template: Story<Props> = (props) =>
	<div className="mx-auto max-w-lg rounded-2xl bg-white p-2">
		<DropdownWrapper {...props}>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in mollis eros, et pulvinar velit. Pellentesque cursus fermentum magna,
				a porttitor est tempus a. Integer fringilla mattis augue, ac iaculis nulla bibendum a. Aenean eget luctus arcu. Nam in consectetur velit.
				Cras euismod ornare porta. Aliquam auctor dapibus diam, at malesuada velit cursus vitae. Pellentesque semper dignissim tortor, sed aliquam nisi
				vehicula eu. Ut vel orci eu purus molestie dignissim. Aenean in congue odio, sit amet sollicitudin leo.
			</p>
		</DropdownWrapper>
	</div>;

export const DropdownSample = Template.bind({});

DropdownSample.args = {
	description: "This text description is unfittingly long for test purposes, is not expected to add a description this long actually",
}