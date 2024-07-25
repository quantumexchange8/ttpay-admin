import { ArrowDown, Search } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import InputIconWrapper from "@/Components/InputIconWrapper";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import ClientTransactionTable from "@/Pages/General/DealHistory/Client/Partials/ClientTransactionTable"
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { startOfMonth, endOfMonth, addMonths, format } from 'date-fns';
import { useEffect } from "react";
import Filter from "@/Components/FilterTable";
import Dropdown from "@/Components/Dropdown";
import { Menu } from '@headlessui/react'
import Button from "@/Components/Button";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Client({ auth }) {

    const [selectedTab, setSelectedTab] = useState('deposit');
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState();

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const getMonthNames = () => {
        const today = new Date();
        const months = [];
        for (let i = 0; i < 12; i++) {
            const month = addMonths(new Date(today.getFullYear(), 0, 1), i);
            months.push(format(month, 'yyyy/MM'));
        }
        return months;
    };

    const getCurrentMonthRange = () => {
        const today = new Date();
        const startDate = startOfMonth(today);
        const endDate = endOfMonth(today);
        return {
            startDate,
            endDate,
        };
    };

    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthRange());
    const months = getMonthNames();

    const handleMonthSelection = (monthIndex) => {
        const today = new Date();
        const startDate = startOfMonth(new Date(today.getFullYear(), monthIndex));
        const endDate = endOfMonth(new Date(today.getFullYear(), monthIndex));
        setSelectedMonth({ startDate, endDate });
    };

    const formatDate = (date) => format(date, 'yyyy-MM-dd HH:mm:ss');

    useEffect(() => {
        
    }, [selectedMonth]);

    const selectedMonthFormatted = format(selectedMonth.startDate, 'yyyy/MM');

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleApplyFilters = (filters) => {
        setFilters(filters)
    };

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Deal History"
        >

            <Head title="Deal History" />
            
            <div className='flex gap-5 flex-col'>
                <div className="text-gray-50 text-lg font-bold">
                    Merchants - Clients
                </div>
                <div className='w-full flex justify-between items-center select-none'>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            <InputIconWrapper 
                                icon={
                                    <Search
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                    />
                                }
                            >
                                <Input
                                    type="text"
                                    name="search"
                                    placeholder="Search"
                                    value={data.search}
                                    className="block w-full caret-primary-700"
                                    autoComplete="search"
                                    isFocused={false}
                                    handleChange={(e) => setData('search', e.target.value)}
                                    required
                                    // cursorColor="#5200FF"
                                    withIcon
                                />
                            </InputIconWrapper>
                            <Filter onApply={handleApplyFilters} statuses='Pending' />
                        </div>
                        <div className="w-full md:w-40">
                            <Dropdown 
                                //  defaultOptions={selectedRateProfile ? selectedRateProfile.name : <span className='text-gray-500 text-base'>Select</span>}
                                 defaultOptions={selectedMonthFormatted}
                                 options={months.map((month, index) => (
                                    <div key={index}>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    type="button"
                                                    className={`group flex w-full items-center rounded-md px-4 py-2 text-sm text-white hover:bg-[#ffffff1a] ${selectedMonth.startDate.getMonth() === index ? 'bg-[#ffffff1a]' : ''}`}
                                                    onClick={() => handleMonthSelection(index)}
                                                >
                                                    {month}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                ))}
                            />
                        </div>
                    </div>

                    <Button
                        size='lg'
                        iconOnly
                        className='flex items-center gap-2'
                    >
                        <span>Export</span>
                        <ArrowDown aria-hidden="true"/>
                    </Button>
                </div>
                <div className="flex flex-col">
                    <div className="w-full">
                        <Tab.Group
                            onChange={(index) => {
                                // Update the selectedTab state based on the selected tab index
                                setSelectedTab(index === 0 ? 'deposit' : 'withdrawal');
                            }}
                        >
                            <Tab.List className="flex py-5 px-3">
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                        'p-3 text-sm font-semibold leading-none',
                                        'focus:outline-none',
                                        selected
                                            ? 'bg-transparent text-white border-b-2 border-gray-300'
                                            : 'text-gray-500 hover:bg-gray-900 rounded-t-md hover:text-white'
                                        )
                                    }
                                >
                                    Deposit
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                        'p-3 text-sm font-semibold leading-none',
                                        'focus:outline-none',
                                        selected
                                            ? 'bg-transparent text-white border-b-2 border-gray-300'
                                            : 'text-gray-500 hover:bg-gray-900 rounded-t-md hover:text-white'
                                        )
                                    }
                                >
                                    Withdrawal
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                <Tab.Panel
                                    className={classNames(
                                        'focus:outline-none'
                                    )}
                                >
                                    <ClientTransactionTable searchVal={searchVal} transactionType={selectedTab} filters={filters} selectedMonthStart={formatDate(selectedMonth.startDate)} selectedMonthEnd={formatDate(selectedMonth.endDate)} />
                                </Tab.Panel>
                                <Tab.Panel
                                    className={classNames(
                                        'focus:outline-none'
                                    )}
                                >
                                    <ClientTransactionTable searchVal={searchVal} transactionType={selectedTab} filters={filters} selectedMonthStart={formatDate(selectedMonth.startDate)} selectedMonthEnd={formatDate(selectedMonth.endDate)} />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                        </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    )
}