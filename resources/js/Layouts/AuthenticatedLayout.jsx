import React, { useState } from 'react';
import Sidebar, { SidebarItem, SectionLabel, SidebarCollapsible, SidebarCollapseItem } from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import { Link, usePage } from '@inertiajs/react';
import { Dashboard, Pending, DealHistory, Performance, SubLine, SubLine2 } from '@/Components/Icon/Outline';

export default function Authenticated({ children }) {
    const { url } = usePage();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    // Function to toggle sidebar expansion
    const toggleSidebar = () => {
      setIsSidebarExpanded(!isSidebarExpanded);
    };

    return (
        // <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="min-h-screen">
            <Sidebar expanded={isSidebarExpanded}>
                <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="GENERAL"/>
                    <div className='w-full flex flex-col gap-1'>
                        <Link href={route('dashboard')} className={`${
                            url === '/dashboard' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<Dashboard/>} text="DASHBOARD" />
                        </Link>
                        <Link href={route('pending')} className={`${
                                url === '/pending' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<Pending/>} text="PENDING" />
                        </Link>
                        
                        <SidebarCollapsible icon={<DealHistory/>} text="DEAL HISTORY" >
                            <div className='flex flex-row gap-[2px]'>
                                <div className='flex flex-col pl-2'>
                                    <SubLine size={20} />
                                    <SubLine2 size={20} />
                                </div>
                                <div className='flex flex-col'>
                                    <SidebarCollapseItem text="Master Merchant" />
                                    <SidebarCollapseItem text="Master Client" />
                                </div>
                            </div>
                            
                        </SidebarCollapsible>
                        <SidebarItem icon={<Performance/>} text="PERFORMANCE"/>
                    </div>
                </div>
                {/* <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="MERCHANT"/>
                    <div className='w-full flex flex-col gap-1'>
                        <SidebarItem text="MERCHANT LISTING"/>
                        <SidebarItem text="CREATE MERCHANT"/>
                        <SidebarItem text="MERCHANT BIN"/>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="SUB-ADMIN"/>
                    <div className='w-full flex flex-col gap-1'>
                        <SidebarItem text="SUB-ADMIN LISTING"/>
                        <SidebarItem text="CREATE SUB-ADMIN"/>
                        <SidebarItem text="SUB-ADMIN ACTIVITY"/>
                        <SidebarItem text="SUB-ADMIN BIN"/>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="CONFIGURATION"/>
                    <div className='w-full flex flex-col gap-1'>
                        <SidebarItem text="RATE PROFILE"/>
                        <SidebarItem text="FREEZING LISTING"/>
                        <SidebarItem text="TRC-20 ADDRESS"/>
                    </div>
                </div> */}
                <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="OTHERS"/>
                    <div className='w-full flex flex-col gap-1'>
                        <SidebarItem text="COMPANY EARNINGS"/>

                        <Link href={route('logout')} method="post" as="button">
                            <SidebarItem text="LOG OUT"/>
                        </Link>
                        
                    </div>
                </div>
            </Sidebar>

            <div className={`min-h-screen flex flex-col ${isSidebarExpanded ? 'lg:ml-[280px]' : 'ml-0'}`}>
                <Navbar toggleSidebar={toggleSidebar}/>
                <main className='w-full flex justify-center'>
                    <div className='max-w-[1440px] w-full p-5'>
                        {children}
                    </div>
                </main>
            </div>

            
        </div>
    );
}
