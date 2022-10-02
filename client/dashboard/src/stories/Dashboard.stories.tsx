import { Meta } from '@storybook/react';
import { SideBarContainer, TopBarContainer } from '@/features/misc/dashboard'
import React from 'react';

const DashboardMock = () => {
  const [isOpened, toggle] = React.useState(false)

  return (<div className='flex'>
    <SideBarContainer sidebarOpened={isOpened} toggleSidebar={toggle} />
    <TopBarContainer handleClick={() => toggle(true)} />
  </div>)
};

const meta: Meta = {
  title: 'Dashboard\'s mock',
  component: DashboardMock,
};

export default meta;

export const Template = () => <DashboardMock /> 