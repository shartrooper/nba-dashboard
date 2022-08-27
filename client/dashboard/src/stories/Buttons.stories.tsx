import { Button, ButtonProps } from '@/components/Elements/Button'

export default {
    title: "Button",
    component: Button
}

export const Template = (args: ButtonProps) => <div className="flex items-center justify-center"><Button {...args}>TEST</Button></div>
