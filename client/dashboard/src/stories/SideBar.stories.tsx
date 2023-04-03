import { Meta, Story } from '@storybook/react';
import { SideBarContainer, SidebarProps, SideBarContent } from '@/features/misc/dashboard';
import React from 'react';
import { MockNavItem, PlaceholderMain } from './components';

const meta: Meta = {
  title: 'dashboard sidebar',
  component: SideBarContainer,
};

export default meta;

const mockNavItems = ['Mock Item 1', 'Mock Item 2', 'Mock Item 3'];



const Template: Story<SidebarProps> = (props) => {
  return (
    <div className="flex">
      <SideBarContainer {...props}>
        <SideBarContent>
          {mockNavItems.map((navItem, index) => (
            <MockNavItem name={navItem} key={index} />
          ))}
        </SideBarContent>
      </SideBarContainer>
      <PlaceholderMain className='md:ml-48 max-h-screen flex-1'/>
    </div>
  );
};

export const OpenedSidebar = Template.bind({});

OpenedSidebar.args = {
  sidebarOpened: true,
  toggleSidebar: () => null,
};

export const CloseableSidebar: Story<SidebarProps> = () => {
  const [isOpened, toggle] = React.useState(true);

  return (
    <div className="flex h-full">
      <SideBarContainer sidebarOpened={isOpened} toggleSidebar={toggle}>
        <SideBarContent>
          {['Mock Item 1', 'Mock Item 2', 'Mock Item 3'].map((navItem, index) => (
            <MockNavItem name={navItem} key={index} />
          ))}
        </SideBarContent>
      </SideBarContainer>
      <PlaceholderMain className='md:ml-48 max-h-screen flex-1' />
    </div>
  );
};
