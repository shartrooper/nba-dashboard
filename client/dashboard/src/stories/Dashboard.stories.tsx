import { Meta } from '@storybook/react';
import { SideBarContainer, TopBarContainer, SideBarContent } from '@/features/misc/dashboard';
import React from 'react';
import { MockNavItemComponent } from './SideBar.stories';
import { MockTopBarItemsComponent } from './TopBar.stories';

const DashboardMock = () => {
  const [isOpened, toggle] = React.useState(false);

  return (
    <div className="flex">
      <SideBarContainer sidebarOpened={isOpened} toggleSidebar={toggle}>
        <SideBarContent>
          <MockNavItemComponent />
        </SideBarContent>
      </SideBarContainer>
      <TopBarContainer handleClick={() => toggle(true)}>
        <MockTopBarItemsComponent />
      </TopBarContainer>
    </div>
  );
};

const meta: Meta = {
  title: "Dashboard's mock",
  component: DashboardMock,
};

export default meta;

export const Template = () => <DashboardMock />;
