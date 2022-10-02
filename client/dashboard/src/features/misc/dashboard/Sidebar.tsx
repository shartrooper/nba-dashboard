import React, { Fragment, Dispatch, SetStateAction } from 'react';
import Hero from '@/assets/hero.png'
import { Dialog, Transition } from '@headlessui/react';


export type SidebarProps = {
	sidebarOpened: boolean,
	toggleSidebar: Dispatch<SetStateAction<boolean>>,
}


const SideBarContent = () => {
	return (
		<>
			<div className="pt-4 mb-10 ml-4 flex items-center justify-start">
				<img alt="NBA hero logo" src={Hero} className="w-10 h-16"></img>
			</div>
			<div className="overflow-y-auto flex-1">
				<div className="mb-10 ml-6 flex items-center justify-start hover:cursor-pointer hover:bg-basketball-dim p-2 rounded-l-full">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
					</svg>
					<h3 className="ml-2 text-xs uppercase">
						DASHBOARD
					</h3>
				</div>
			</div>
		</>
	)
}

export const SideBarContainer = ({ sidebarOpened, toggleSidebar }: SidebarProps) => {

	function closeModal() {
		toggleSidebar(false)
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
				show={sidebarOpened}>
				<Dialog as="div" onClose={closeModal} className="fixed text-chalkboard top-4 left-2 z-40 md:hidden w-full">
					{/* The backdrop, rendered as a fixed sibling to the panel container */}
					<div className="fixed inset-0 bg-white/30" aria-hidden="true" />
					<Dialog.Panel className="flex bg-midnight relative flex-col w-36 h-screen border-r border-chalkboard md:hidden">
						<button
							className="hover:ring-2 hover:ring-gray-300 flex absolute top-2 right-2 justify-center items-center w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
							type="button" onClick={closeModal}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						<SideBarContent />
					</Dialog.Panel >
				</Dialog>
			</Transition>
			<div className="hidden md:block flex flex-col w-48 h-screen border-r border-chalkboard">
				<SideBarContent />
			</div>
		</>
	);
}