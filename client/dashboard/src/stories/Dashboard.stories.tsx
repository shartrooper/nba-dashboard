import { Meta } from '@storybook/react';
import { SideBarContainer, TopBarContainer, SideBarContent } from '@/features/misc/dashboard';
import React, { ReactNode } from 'react';
import { MockNavItemComponent, MockTopBarItemsComponent } from './components';

const DashboardMock = ({ children }: { children?: ReactNode }) => {
  const [isOpened, toggle] = React.useState(false);

  return (
    <div className="flex">
      <SideBarContainer sidebarOpened={isOpened} toggleSidebar={toggle}>
        <SideBarContent>
          <MockNavItemComponent />
        </SideBarContent>
      </SideBarContainer>
      <div className="flex-col flex-auto md:justify-end justify-between py-3 px-3 md:px-6 space-x-3 md:space-x-6">
        <TopBarContainer userName="mockUser" handleClick={() => toggle(true)}>
          <MockTopBarItemsComponent />
        </TopBarContainer>
        {children}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: "Dashboard's mock",
  component: DashboardMock,
};

export default meta;

export const Template = () => <DashboardMock />;
