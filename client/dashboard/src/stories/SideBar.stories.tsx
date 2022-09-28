import { Meta, Story } from '@storybook/react';
import { SideBarContainer, SidebarProps } from '@/features/misc/dashboard'
import React from 'react';


const meta: Meta = {
    title: 'dashboard sidebar',
    component: SideBarContainer,
};

export default meta;

const Template: Story<SidebarProps> = (props) => {
    return (<div className='flex h-full'>
        <SideBarContainer {...props} />
        <div className='flex-1'></div>
    </div>)
};

export const OpenedSidebar = Template.bind({});
OpenedSidebar.args = {
    sidebarOpened: true,
    toggleSidebar: () => null
};

export const CloseableSidebar: Story<SidebarProps> = () => {
    const [isOpened, toggle] = React.useState(true)

    return (<div className='flex h-full'>
        <SideBarContainer sidebarOpened={isOpened} toggleSidebar={() => toggle(false)} />
        <div className='flex-1'></div>
    </div>)
};