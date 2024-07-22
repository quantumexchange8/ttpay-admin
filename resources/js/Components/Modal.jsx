import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from './Icon/Outline';

export default function Modal({ children, title, show = false, maxWidth = '2xl', showCloseButton = true, onClose = () => {}, maxHeight }) {
    const close = () => {
        if (showCloseButton) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-[460px]',
        lg: 'sm:max-w-[614.4px]',
        xl: 'max-w-[320px] md:max-w-[921.6px]',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    const maxHeightClass = {
        xl: 'sm:max-h-[518.4px]',
    }[maxHeight];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-40 transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75 dark:bg-black/50" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`p-8 flex flex-col gap-8 bg-white dark:bg-[#ffffff0d] backdrop-blur-[60px] rounded-lg overflow-y-auto shadow-[0_24px_40px_0px_rgba(0,0,0,0.25)] transform transition-all sm:w-full sm:mx-auto ${maxWidthClass} ${maxHeightClass} scrollbar-thin scrollbar-webkit`}
                    >
                        {showCloseButton && (
                            <div className='flex justify-between'>
                                {title && <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>}
                                <button className="dark:hover:text-gray-300" onClick={onClose}>
                                    <XIcon className="h-6 w-6 text-gray-400 hover:text-gray-700" aria-hidden="true" />
                                </button>
                            </div>
                        )}
                        
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
