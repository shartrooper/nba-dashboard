import React, { Dispatch, SetStateAction, ReactNode, PropsWithChildren, useRef } from 'react';
import Hero from '@/assets/hero.png';
import { Dialog, Transition } from '@headlessui/react';

export type SidebarProps = {
  sidebarOpened: boolean;
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
};

export const SideBarContent = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div className="pt-4 mb-10 ml-4 flex items-center justify-start">
        <img alt="NBA hero logo" src={Hero} className="w-10 h-16"></img>
      </div>
      <div className="overflow-y-auto flex-1">{children}</div>
    </>
  );
};

export const SideBarContainer = ({
  sidebarOpened,
  toggleSidebar,
  children,
}: PropsWithChildren<SidebarProps>) => {
  // initial focusable element
  const closeButtonRef =useRef(null);
  function closeModal() {
    toggleSidebar(false);
  }

  return (
    <>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        show={sidebarOpened}
      >
        <Dialog
          initialFocus={closeButtonRef}
          as="div"
          onClose={closeModal}
          className="fixed text-chalkboard inset-0 z-40 md:hidden w-full"
        >
          {/* The backdrop*/}
          <div className="fixed inset-0 bg-white/30" aria-hidden="true" />
          {/*The actual sidebar*/}
          <Dialog.Panel className="flex bg-midnight relative flex-col w-36 h-screen border-r border-chalkboard md:hidden">
            <button
              ref={closeButtonRef}
              className="hover:ring-2 hover:ring-gray-300 flex absolute top-2 right-2 justify-center items-center w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
              type="button"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {children}
          </Dialog.Panel>
        </Dialog>
      </Transition>
      <div className="fixed hidden md:flex flex-col w-48 h-screen border-r border-chalkboard">
        {children}
      </div>
    </>
  );
};
