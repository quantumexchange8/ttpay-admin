import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Menu, Notification, Lang, Logout } from '@/Components/Icon/Outline';

export default function Navbar({ user, header, toggleSidebar }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div>
            <nav className="bg-white dark:bg-[#ffffff0d] border-b border-gray-800 dark:border-gray-800">
                <div className="px-5 pt-8 pb-3 sm:px-6 lg:px-8 flex justify-between items-center gap-3">
                    <div className='p-2'>
                        <Menu 
                            color='currentColor'
                            className='text-gray-400 hover:text-white cursor-pointer'
                            onClick={toggleSidebar}
                        />
                    </div>
                    
                    <div className='text-xl font-bold w-full text-gray-50'>
                        {header}
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='p-[10px]'>
                            <Notification
                                color='currentColor'
                                className='text-gray-400 hover:text-white cursor-pointer'
                            />
                        </div>
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