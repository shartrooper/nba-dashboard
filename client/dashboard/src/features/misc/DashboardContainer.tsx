import {
  NavigationItems,
  Links,
  SideBarContainer,
  SideBarContent,
  TopBarContainer,
} from '@/features/misc/dashboard';
import { Menu } from '@headlessui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchUsername from './hooks/useFetchUsername';

const menuRoutes: Links = [{ name: 'Account Settings', route: './' }];
const sideBarRoutes: Links = [{ name: 'dashboard', route: './' }];

const renderMenuItem = (key: string, route: string, name: string) => {
  return (
    <Menu.Item key={key}>
      {({ active }) => (
        <div
          className={`${active && 'bg-basketball'} py-2 px-4 text-sm cursor-pointer`}
        >
          <Link
            className="nav-link"
            to={route}
          >
            {name}
          </Link>
        </div>
      )}
    </Menu.Item>
  );
};

const renderSideBarNavItem = (key: string, route: string, name: string) => {
  return (
    <div
      key={key}
      className="mb-10 ml-6 flex items-center justify-start hover:cursor-pointer hover:bg-basketball-dim p-2 rounded-l-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
        />
      </svg>
      <div
        className="ml-2 text-xs uppercase"
      >
        <Link className="nav-link" to={route} >
          {name}
        </Link>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [isOpened, toggle] = useState(true);
  const { data } = useFetchUsername();
  const currentUser= data?.getMe.username ?? ''; 

  return (
    <div className="flex">
      <SideBarContainer sidebarOpened={isOpened} toggleSidebar={toggle}>
        <SideBarContent>
          <NavigationItems renderNavItem={renderSideBarNavItem} links={sideBarRoutes} />
        </SideBarContent>
      </SideBarContainer>
      <TopBarContainer handleClick={() => toggle(true)} userName={currentUser}>
        <NavigationItems renderNavItem={renderMenuItem} links={menuRoutes} />
      </TopBarContainer>
    </div>
  );
};