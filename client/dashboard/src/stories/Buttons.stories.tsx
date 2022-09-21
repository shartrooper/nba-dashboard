import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from '@/components/Elements/Button'

const meta: Meta = {
    title: "Button",
    component: Button
}

export default meta;

export const Template: Story<ButtonProps>= (args) => <div className="flex items-center justify-center"><Button {...args}>TEST</Button></div>
