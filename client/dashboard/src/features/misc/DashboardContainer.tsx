import { SideBarContainer, TopBarContainer } from '@/features/misc/dashboard'
import React, { useState } from 'react';

export const Dashboard = () => {
  const [isOpened, toggle] = useState(true)

  return (<div className='flex'>
    <SideBarContainer sidebarOpened={isOpened} toggleSidebar={toggle} />
    <TopBarContainer handleClick={() => toggle(true)} />
  </div>)
};