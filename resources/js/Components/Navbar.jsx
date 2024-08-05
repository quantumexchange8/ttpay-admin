import { Fragment, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { MenuIcon, Notification, Lang, Logout, DotVerticalIcon } from '@/Components/Icon/Outline';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Navbar({ user, header, toggleSidebar }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
       
        <nav className="sticky top-0 z-30 w-full bg-white dark:bg-[#ffffff0d] border-b border-gray-800 backdrop-blur-3xl dark:border-gray-800">
            <div className="px-5 pt-8 pb-3 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
                <div className='p-2'>
                    <MenuIcon 
                        color='currentColor'
                        className='text-gray-400 hover:text-white cursor-pointer'
                        onClick={toggleSidebar}
                    />
                </div>
                
                <div className='text-base md:text-xl font-bold w-full text-gray-50'>
                    {header}
                </div>
                <div className='flex items-center gap-3'>
                    <div className='p-[10px]'>
                        <Notification
                            color='currentColor'
                            className='text-gray-400 hover:text-white cursor-pointer'
                        />
                    </div>
                    <div className='hidden md:flex gap-3 items-center' >
                        <div className='p-[10px]'>
                            <Lang
                                color='currentColor'
                                className='text-gray-400 hover:text-white cursor-pointer'
                            />
                        </div>
                        <div className='p-[10px]'>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                <Logout
                                    color='currentColor'
                                    className='text-gray-400 hover:text-white cursor-pointer'
                                />
                            </ResponsiveNavLink>
                            
                        </div>
                    </div>
                    <div className='block md:hidden'>
                        <div className="">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                <Menu.Button className="inline-flex w-full justify-center rounded-md p-[10px] hover:bg-black/30 focus:outline-none">
                                    <DotVerticalIcon />
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
                                <Menu.Items className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-[8px] bg-white/10 backdrop-blur-3xl shadow-lg focus:outline-none">
                                    <div className="py-2">
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                className={`${
                                                active ? 'bg-transparent text-white' : 'text-white'
                                                } group flex w-full items-center rounded-md p-3 text-sm`}
                                            >
                                                {/* {active ? (
                                                <EditActiveIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                                ) : (
                                                <EditInactiveIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                                )} */}
                                                <div className='flex items-center gap-2.5'>
                                                    <Lang />
                                                    Langauge
                                                </div>
                                            </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                className={`${
                                                active ? 'bg-transparent text-white' : 'text-white'
                                                } group flex w-full items-center rounded-md p-3 text-sm`}
                                            >
                                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                                    <div className='flex items-center gap-2.5 text-white text-sm' >
                                                        <Logout />
                                                        Log Out
                                                    </div>

                                                </ResponsiveNavLink>
                                            </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                                </Transition>
                            </Menu>
                            </div>
                    </div>
                </div>
            </div>

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
                        {/* <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink> */}
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}