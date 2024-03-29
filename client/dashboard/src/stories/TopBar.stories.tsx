import { Meta } from '@storybook/react';
import { MockMenuItem, PlaceholderMain } from './components';
import { Menu, Transition } from '@headlessui/react';
import { PropsWithChildren } from 'react';
import Avatar from '@/assets/avataricon.png';




const meta: Meta = {
  title: 'dashboard header',
};

export default meta;

const mockNavItems = ['Mock A', 'Mock B', 'Mock C', 'Mock D'];


const MockTopBarContainer = ({
  handleClick,
  userName,
  children,
}: PropsWithChildren<{ userName: string, handleClick: () => void }>) => {

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

      <Menu as="div" className="relative">
        <Menu.Button className="rounded-full inline-flex justify-center items-center hover:bg-basketball p-2">
          {userName}
          <img className="ml-1 inline w-10 h-10 rounded-full" src={Avatar} alt="avatar img"></img>
        </Menu.Button>
        <Transition
          enter-active-class="transition duration-100 ease-out transform"
          enter-from-class="opacity-0 scale-90"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-100 ease-in transform"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-90"
        >
          <Menu.Items className="overflow-hidden absolute 
            right-0 bg-midnight
            mt-2 w-48 rounded-md border 
            border-chalkboard shadow-lg 
            origin-top-right focus:outline-none">
            {children}
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${active && 'bg-basketball'} py-2 px-4 text-sm cursor-pointer`}
                >
                  Log Out
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div >
  );
};

const TopBarComponent = () => (
  <MockTopBarContainer userName="MockUser" handleClick={() => null}>
    {mockNavItems.map((navItem, index) => (
      <MockMenuItem key={index} name={navItem} />
    ))}
  </MockTopBarContainer>
);

export const Template = () => {
  return <div className="relative flex">
    <PlaceholderMain className='hidden md:block fixed w-48' />
    <div className='md:ml-48 flex-auto'>
      <TopBarComponent />
    </div>
  </div>
}