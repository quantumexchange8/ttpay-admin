import React, { useState } from 'react';
import Sidebar, { SidebarItem, SectionLabel, SidebarCollapsible, SidebarCollapseItem } from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import { Link, usePage } from '@inertiajs/react';
import { SubLine, SubLine2 } from '@/Components/Icon/Outline';
import { Dashboard, Pending, DealHistory, Performance, RateProfile, Tron, Merchant, AddMerchant, Bin, Freeze, PayoutConfigIcon, Company, } from '@/Components/Icon/Menu';
import {CustomToaster} from '@/Components/CustomToaster';
import { useEffect } from 'react';

export default function Authenticated({ children, header }) {
    const { url } = usePage();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    
    // Function to toggle sidebar expansion
    const toggleSidebar = () => {
      setIsSidebarExpanded(!isSidebarExpanded);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) { // md breakpoint (768px)
                setIsSidebarExpanded(true);
            } else {
                setIsSidebarExpanded(false);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('/getPendingCount');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    return (
        // <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="min-h-screen bg-bg-image bg-cover bg-center bg-no-repeat">
            <Sidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar}>
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
                            <SidebarItem icon={<Pending/>} text="PENDING" pending={data}/>
                        </Link>
                        
                        <SidebarCollapsible icon={<DealHistory/>} text="DEAL HISTORY" >
                            <div className='flex flex-row gap-[2px]'>
                                <div className='flex flex-col pl-2'>
                                    <SubLine size={20} />
                                    <SubLine2 size={20} />
                                </div>
                                <div className='flex flex-col'>
                                <Link href={route('deal-history.merchant')} className={`${
                                    url === '/deal-history/merchant' ? 'rounded-lg' : ''
                                }`}>
                                    <SidebarCollapseItem text="Master Merchant" />
                                </Link>
                                <Link href={route('deal-history.client')} className={`${
                                    url === '/deal-history/client' ? 'rounded-lg' : ''
                                }`}>
                                    <SidebarCollapseItem text="Master Client" />
                                </Link>
                                </div>
                            </div>
                        </SidebarCollapsible>
                        {/* <SidebarItem icon={<Performance/>} text="PERFORMANCE"/> */}
                    </div>
                </div>
                 <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="MERCHANT"/>
                    <div className='w-full flex flex-col gap-1'>
                        <Link href={route('merchant.merchant-listing')} className={`${
                                url === '/merchant/merchant-listing' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<Merchant/>} text="MERCHANT LISTING"/>
                        </Link>
                        <Link href={route('merchant.create-merchant')} className={`${
                                url === '/merchant/create-merchant' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<AddMerchant/>} text="CREATE MERCHANT"/>
                        </Link>
                        <Link href={route('merchant.merchant-bin')} className={`${
                                url === '/merchant/merchant-bin' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<Bin/>} text="MERCHANT BIN"/>
                        </Link>
                    </div>
                </div>
                {/* <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="SUB-ADMIN"/>
                    <div className='w-full flex flex-col gap-1'>
                        <SidebarItem text="SUB-ADMIN LISTING"/>
                        <SidebarItem text="CREATE SUB-ADMIN"/>
                        <SidebarItem text="SUB-ADMIN ACTIVITY"/>
                        <SidebarItem text="SUB-ADMIN BIN"/>
                    </div>
                </div> */}
                <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="CONFIGURATION"/>
                    <div className='w-full flex flex-col gap-1'>
                        <Link href={route('configuration.rate_profile')} className={`${
                                url === '/configuration/rate_profile' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<RateProfile/>} text="RATE PROFILE" />
                        </Link>
                        <Link href={route('configuration.freeze_listing')} className={`${
                                url === '/configuration/freeze_listing' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<Freeze/>} text="FREEZING LISTING"/>
                        </Link>
                        <Link href={route('configuration.wallet-address')} className={`${
                                url === '/configuration/wallet-address' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<Tron/>} text="WALLET ADDRESS"/>
                        </Link>
                        <Link href={route('configuration.payout-configuration')} className={`${
                                url === '/configuration/payout-configuration' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<PayoutConfigIcon/>} text="Payout Configuration"/>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <SectionLabel text="OTHERS"/>
                    <div className='w-full flex flex-col gap-1'>
                        <Link href={route('company-earnings')} className={`${
                                url === '/company-earnings' ? 'bg-[#03071299] rounded-lg' : ''
                        }`}>
                            <SidebarItem icon={<Company/>} text="COMPANY EARNINGS"/>
                        </Link>

                        <Link href={route('logout')} method="post" as="button">
                            <SidebarItem text="LOG OUT"/>
                        </Link>
                        
                    </div>
                </div>
            </Sidebar>

            <div className={`min-h-screen flex flex-col ${isSidebarExpanded ? 'lg:ml-[280px]' : 'ml-0'}`}>
                <Navbar toggleSidebar={toggleSidebar} header={header}/>
                <main className='w-full flex justify-center'>
                    <div className='max-w-[1440px] w-full p-3  md:p-5'>
                        {children}
                    </div>

                    <CustomToaster/>
                </main>
            </div>            
        </div>
    );
}
