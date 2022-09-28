import { Meta, Story } from '@storybook/react';
import { Spinner, SpinnerProps } from '@/components/Elements/Spinner'

const meta: Meta = {
  title: 'Components/Spinners',
  component: Spinner,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SpinnerProps> = (props) => <Spinner {...props} />;

export const TinyLoader = Template.bind({});
TinyLoader.args = {
  size: 'sm',
};
export const Loader = Template.bind({});
Loader.args = {
  size: 'md'
};
export const LargeLoader = Template.bind({});
LargeLoader.args = {
  size: 'lg'
}
export const ExtraLargeLoader = Template.bind({});
ExtraLargeLoader.args = {
  size: 'xl'
}