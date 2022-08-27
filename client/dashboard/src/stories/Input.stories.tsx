import { InputField, InputFieldProps } from '@/components/Form';

export default {
    title: "Input",
    component: InputField
}

export const Template = (args: InputFieldProps) => <div className="flex items-center justify-center"><InputField {...args} /></div>