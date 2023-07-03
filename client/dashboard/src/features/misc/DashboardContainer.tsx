import {
  NavigationItems,
  Links,
  SideBarContainer,
  SideBarContent,
  TopBarContainer,
} from '@/features/misc/dashboard';
import { Menu } from '@headlessui/react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetchUserInfo from './hook/useFetchUser';
import { DashboardRoutes } from './routes';
import clsx from 'clsx';
import { PresentationChartBarIcon, UserGroupIcon } from '@heroicons/react/20/solid';

const menuRoutes: Links = [{ name: 'Account Settings', route: '../settings' }];
const sideBarRoutes: Links = [{ name: 'Dashboard', route: '../', icon: <PresentationChartBarIcon  className='w-6 h-6'/> },
{ name: 'Players', route: '../players', icon: <UserGroupIcon className='w-6 h-6' /> }];

const renderMenuItem = (key: string, route: string, name: string) => {
  return (
    <Menu.Item key={key}>
      {({ active }) => (
        <div className={`${active && 'bg-basketball'} py-2 px-4 text-sm cursor-pointer`}>
          <Link className="nav-link" to={route}>
            {name}
          </Link>
        </div>
      )}
    </Menu.Item>
  );
};

export const Dashboard = () => {
  const [isOpened, toggle] = useState(true);
  const username = useFetchUserInfo('username') ?? '';
  const { pathname } = useLocation();

  const renderSideBarNavItem = (key: string, route: string, name: string, icon?: JSX.Element) => {
    return (
      <div
        key={key}
        className={clsx("mb-10 ml-6 flex items-center justify-start hover:cursor-pointer hover:bg-basketball-dim p-2 rounded-l-full",
          `${pathname === route.slice(2) && "bg-basketball-dim"}`)}
      >
        {icon}
        <div className="ml-2 text-xs uppercase">
          <Link className="nav-link" to={route}>
            {name}
          </Link>
        </div>
      </div>
    );
  };


  return (
    <div className="flex">
      <SideBarContainer sidebarOpened={isOpened} toggleSidebar={toggle}>
        <SideBarContent>
          <NavigationItems renderNavItem={renderSideBarNavItem} links={sideBarRoutes} />
        </SideBarContent>
      </SideBarContainer>
      <div className="relative flex-col flex-auto min-h-screen py-3 px-3 md:px-6 space-x-3 md:space-x-6 md:ml-48">
        <TopBarContainer handleClick={() => toggle(true)} userName={username}>
          <NavigationItems renderNavItem={renderMenuItem} links={menuRoutes} />
        </TopBarContainer>
        <DashboardRoutes />
      </div>
    </div>
  );
};