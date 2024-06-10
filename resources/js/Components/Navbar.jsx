import { Fragment, useEffect, useRef, useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Menuu, Notification, Navbars, Lang, Logout } from '@/Components/Icon/Outline';
import { ArchiveBoxXMarkIcon, ChevronDownIcon, PencilIcon, Square2StackIcon, TrashIcon } from '@heroicons/react/16/solid'
import { Menu, Transition } from '@headlessui/react'

export default function Navbar({ user, header, toggleSidebar }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div>
            <nav className="bg-white dark:bg-[#ffffff0d] border-b border-gray-800 dark:border-gray-800">
                <div className="px-5 pt-8 pb-3 sm:px-3 lg:px-5 xl:px-5 md:px-5 flex justify-between items-center gap-3">
                    <div className='p-2'>
                        <Menuu 
                            color='currentColor'
                            className='text-gray-400 hover:text-white cursor-pointer'
                            onClick={toggleSidebar}
                        />
                    </div>
                    
                    <div className='sm:text-base xl:text-xl lg:text-xl md:text-xl font-bold w-full text-gray-50'>
                        {header}
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='p-[10px]'>
                            <Notification
                                color='currentColor'
                                className='text-gray-400 hover:text-white cursor-pointer'
                            />
                        </div>
                        <div className='hidden md:flex p-[10px]'>
                            <Lang
                                color='currentColor'
                                className='text-gray-400 hover:text-white cursor-pointer'
                            />
                        </div>
                        <div className='hidden md:flex p-[10px]'>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                <Logout
                                    color='currentColor'
                                    className='text-gray-400 hover:text-white cursor-pointer'
                                />
                            </ResponsiveNavLink>
                        </div>
                        <div className='p-[10px] md:hidden'>
                            <Menu as="div" className="relative text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 mt-1">
                                        <Navbars
                                            color='currentColor'
                                            className='text-gray-400 hover:text-white cursor-pointer'
                                        />
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
                                    <Menu.Items className="absolute flex flex-col gap-3 right-1 mt-2 w-[110px] rounded-[3px] bg-[#5200FF] shadow-lg ring-1 ring-black/5 focus:outline-none text-sm font-semibold text-center text-[white] px-2 py-2">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Menu as="div" className="relative text-left">
                                                    <div>
                                                        <Menu.Button className="flex items-center gap-2 w-full">
                                                            <Lang className='text-white'/>
                                                            Language
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
                                                        <Menu.Items className="absolute flex flex-col gap-3 top-0 right-[100px] mt-0 w-[80px] rounded-[3px] bg-[#5200FF] shadow-lg ring-1 ring-black/5 focus:outline-none text-sm font-semibold text-center text-[white] px-2 py-2">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button className='w-full'>
                                                                        Chinese
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button className='w-full'>
                                                                        English
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button className='w-full'>
                                                                        Malay
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div className='flex flex-row gap-2'>
                                                    <div>
                                                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                            <Logout
                                                                color='currentColor'
                                                                className='text-white hover:text-white cursor-pointer'
                                                            />
                                                        </ResponsiveNavLink>
                                                    </div>
                                                    Log Out
                                                </div>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            {/* <Navbars
                                    color='currentColor'
                                    className='text-gray-400 hover:text-white cursor-pointer'
                                /> */}
                        </div>
                    </div>
                </div>
{/* <Menu.Items className="absolute flex flex-col gap-3 right-1 mt-2 w-[110px] rounded-[3px] bg-[#5200FF] shadow-lg ring-1 ring-black/5 focus:outline-none text-sm font-semibold text-center text-[white] px-2 py-2">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button>
                                                <div className='flex flex-row gap-2'>
                                                    <div>
                                                        <Lang/>
                                                    </div>
                                                     Language
                                                </div>
                                               
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div className='flex flex-row gap-2'>
                                                <div>
                                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                    <Logout
                                                        color='currentColor'
                                                        className='text-white hover:text-white cursor-pointer'
                                                    />
                                                </ResponsiveNavLink>
                                                </div>
                                                Log Out
                                        </div>
                                        )}
                                    </Menu.Item>
                                </Menu.Items> */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {/* {user.name} */}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {/* {user.email} */}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}