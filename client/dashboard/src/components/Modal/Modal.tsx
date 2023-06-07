import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, MutableRefObject, SetStateAction, useRef } from 'react'


export type ChildrenProps = {
  onClose: () => void,
  childElemRef?: MutableRefObject<null>
}


export type ModalWrapperProps = {
  isOpen: boolean;
  toggle: Dispatch<SetStateAction<boolean>>;
  header: string;
  Body: React.FunctionComponent<ChildrenProps>;
};

export function ModalWrapper({ isOpen, header, toggle, Body }: ModalWrapperProps) {
  function closeModal() {
    toggle(false)
  }
  //Parent's body component as initial Focusable element.
  const childRef = useRef(null);
  const ModalBodyComponent = () => <Body childElemRef={childRef} onClose={closeModal} />

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog initialFocus={childRef} as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 my-3"
                  >
                    {header}
                  </Dialog.Title>
                  <ModalBodyComponent />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}