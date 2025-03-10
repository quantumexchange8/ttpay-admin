import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

export default function Dropdown({ defaultOptions, options, hasError }) {

    const [isOpen, setIsOpen] = useState(false);
    
  return (
    <div className="w-full">
      <Menu as="div" className="w-full relative inline-block text-left">
        <div>
        <Menu.Button
            className={`inline-flex w-full h-10 justify-center items-center rounded-md bg-[#ffffff0d] px-4 py-2 text-sm font-medium text-white hover:bg-[#ffffff1a] focus:outline-none ${
                isOpen ? 'ring-2 ring-primary-800' : ''
            } ${hasError ? 'border border-error-600 focus:ring-1 focus:ring-error-600 focus:border-error-600' : 'border-none focus:border-primary-800 focus:ring focus:ring-primary-800'}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className='w-full flex items-center justify-between'>
                <span className='w-full text-left'>
                    {defaultOptions != null ? defaultOptions : <span className='text-gray-500'>Select</span>}
                </span>
                <span>
                    {isOpen ? (
                        <ChevronUpIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                        ) : (
                        <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    )}
                </span>
            </div>
            
            
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 w-full mt-1 py-2 rounded-md bg-[#6B7280] backdrop-blur-[60px]">
            {options}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
