import { Menu } from "@headlessui/react";

export const MockNavItem = ({ name }: { name: string }) => {
  return (
    <div className="mb-10 ml-6 flex items-center justify-start hover:cursor-pointer hover:bg-basketball-dim p-2 rounded-l-full">
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
      {name}
    </div>
  );
};

export const MockNavItemComponent = () => {
  return (
    <>
      {['Mock A', 'Mock B', 'Mock C', 'Mock D'].map((navItem, index) => (
        <MockNavItem name={navItem} key={index} />
      ))}
    </>
  );
};

export const MockMenuItem = ({ name }: { name: string }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <div className={`${active && 'bg-basketball'} py-2 px-4 text-sm cursor-pointer`}>
          {name}
        </div>
      )}
    </Menu.Item>
  );
};

export const MockTopBarItemsComponent = () => (
  <>
    {['Menu Item 1','menu Item 2','Menu Item 3'].map((navItem, index) => (
      <MockMenuItem key={index} name={navItem} />
    ))}
  </>
);

