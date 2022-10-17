import { Meta, Story } from '@storybook/react';
import { SideBarContainer, SidebarProps, SideBarContent } from '@/features/misc/dashboard'
import React from 'react';


const meta: Meta = {
    title: 'dashboard sidebar',
    component: SideBarContainer,
};

export default meta;

const mockNavItems = ['Mock A', 'Mock B', 'Mock C', 'Mock D'];


const MockNavItem = ({ name }: { name: string }) => {
    return (
        <div className="mb-10 ml-6 flex items-center justify-start hover:cursor-pointer hover:bg-basketball-dim p-2 rounded-l-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
            {name}
        </div>
    )
}

export const MockNavItemComponent = () => {
    return <>{mockNavItems.map((navItem, index) => <MockNavItem name={navItem} key={index} />)}</>
}

const Template: Story<SidebarProps> = (props) => {
    return (<div className='flex h-full'>
        <SideBarContainer {...props}>
            <SideBarContent>
                {mockNavItems.map((navItem, index) => <MockNavItem name={navItem} key={index} />)}
            </SideBarContent>
        </SideBarContainer>
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
        <SideBarContainer sidebarOpened={isOpened} toggleSidebar={toggle}>
            <SideBarContent>
                {mockNavItems.map((navItem, index) => <MockNavItem name={navItem} key={index} />)}
            </SideBarContent>
        </SideBarContainer>
        <div className='flex-1'></div>
    </div>)
};