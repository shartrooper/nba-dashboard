import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '@/components/Elements/Button';

const meta: Meta = {
  title: 'Button',
  component: Button,
};

export default meta;

const Template: Story<ButtonProps> = (args) => (
  <div className="flex items-center justify-center mt-6">
    <Button {...args}>Test</Button>
  </div>
);


export const LargeButton = Template.bind({});

export const MediumButton = Template.bind({});

export const SmallButton = Template.bind({});

LargeButton.args = { size: "lg" };
MediumButton.args = { size: "md" };
SmallButton.args = {size: "sm"}