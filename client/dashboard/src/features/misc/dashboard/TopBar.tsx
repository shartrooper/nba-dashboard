import { Menu } from '@headlessui/react';
import Avatar from '@/assets/avataricon.png';
import { PropsWithChildren } from 'react';
import { useNotificationStore } from '@/store';
import { NotificationMsg } from '@/components/Notifications';
import { useRedirectionToRoot } from '@/utils';
import { MenuWrapper } from '@/components/Menu';

export type TopBarProps = {
  handleClick: () => void;
  userName: string;
};

const logoutMsg: NotificationMsg = {
  title: 'Logged out.',
  message: 'Succesfully logged out of your dashboard session.',
  type: 'success',
};

export const TopBarContainer = ({
  handleClick,
  userName,
  children,
}: PropsWithChildren<TopBarProps>) => {
  const { addNotification } = useNotificationStore();
  const clearSession = useRedirectionToRoot();

  const handleLogout = () => {
    clearSession();
    addNotification(logoutMsg);
  };

  return (
    <div className='flex md:justify-end justify-between'>
      <div className="md:hidden hover:cursor-pointer pt-4" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <MenuWrapper
        classes={{
          menu: "rounded-full"
        }}
        menuButton={
          <>
            {userName}
            <img className="ml-1 inline w-10 h-10 rounded-full" src={Avatar} alt="avatar img"></img>
          </>
        }
        items={
          <>
            {children}
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={handleLogout}
                  className={`${active && 'bg-basketball'} py-2 px-4 text-sm cursor-pointer`}
                >
                  Log Out
                </div>
              )}
            </Menu.Item>
          </>
        }
      />
    </div>
  );
};
