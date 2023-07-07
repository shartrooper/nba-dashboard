import { DataTable, DataTableProps } from "@/components/Datatable";
import { columns } from "@/components/Datatable/columns";
import { Meta, Story } from "@storybook/react";

const meta: Meta = {
	title: 'Datatable',
	parameters: {
		controls: { expanded: true },
	},
};

export default meta;


const data: Payment[] = [
	{
		id: "m5gr84i9",
		amount: 316,
		status: "success",
		email: "ken99@yahoo.com",
	},
	{
		id: "3u1reuv4",
		amount: 242,
		status: "success",
		email: "Abe45@gmail.com",
	},
	{
		id: "derv1ws0",
		amount: 837,
		status: "processing",
		email: "Monserrat44@gmail.com",
	},
	{
		id: "5kma53ae",
		amount: 874,
		status: "success",
		email: "Silas22@gmail.com",
	},
	{
		id: "bhqecj4p",
		amount: 721,
		status: "failed",
		email: "carmella@hotmail.com",
	},
	{
		id: "m5gr84i9",
		amount: 316,
		status: "success",
		email: "ken99@yahoo.com",
	},
	{
		id: "3u1reuv4",
		amount: 242,
		status: "success",
		email: "Abe45@gmail.com",
	},
	{
		id: "derv1ws0",
		amount: 837,
		status: "processing",
		email: "Monserrat44@gmail.com",
	},
	{
		id: "5kma53ae",
		amount: 874,
		status: "success",
		email: "Silas22@gmail.com",
	},
	{
		id: "bhqecj4p",
		amount: 721,
		status: "failed",
		email: "carmella@hotmail.com",
	},
	{
		id: "m5gr84i9",
		amount: 316,
		status: "success",
		email: "ken99@yahoo.com",
	},
	{
		id: "3u1reuv4",
		amount: 242,
		status: "success",
		email: "Abe45@gmail.com",
	},
	{
		id: "derv1ws0",
		amount: 837,
		status: "processing",
		email: "Monserrat44@gmail.com",
	},
	{
		id: "5kma53ae",
		amount: 874,
		status: "success",
		email: "Silas22@gmail.com",
	},
	{
		id: "bhqecj4p",
		amount: 721,
		status: "failed",
		email: "carmella@hotmail.com",
	},
]

type Payment = {
	id: string
	amount: number
	status: "pending" | "processing" | "success" | "failed"
	email: string
}


const Template: Story<DataTableProps<Payment, typeof columns>> = (props) => <DataTable {...props} />

export const PaymentsTable = Template.bind({});

PaymentsTable.args = { data, columns };