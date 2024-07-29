import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from "@inertiajs/react";
import InputIconWrapper from "@/Components/InputIconWrapper";
import { ArrowDown, Search } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import CompanyEarningTable from "./Partials/CompanyEarningTable";
import Dropdown from "@/Components/Dropdown";
import { Menu } from '@headlessui/react'
import { useState } from "react";
import { useEffect } from "react";
import { startOfMonth, endOfMonth, addMonths, format } from 'date-fns';

export default function CompanyEarning({ auth, totalMerchant, totalDeposit, totalWithdrawal, totalFee }) {

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

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Company Earnings"
        >
            <Head title="Company Earnings" />
            <div className='flex gap-5 flex-col'>
                <div className="w-full p-4 md:p-5 bg-[#ffffff0d] rounded-xl flex flex-col gap-5">
                    <div className="text-gray-50 text-lg font-bold">
                        Overview Data
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="py-3 px-5 bg-[#03071266] flex flex-col gap-2 w-full rounded">
                            <div className="text-gray-500 text-sm">Total Merchant</div>
                            <div className="text-white text-lg font-bold">
                                {totalMerchant}
                            </div>
                        </div>
                        <div className="py-3 px-5 bg-[#03071266] flex flex-col gap-2 w-full rounded">
                            <div className="text-gray-500 text-sm">Total Deposit</div>
                            <div className="text-white text-lg font-bold">
                                $ {totalDeposit}
                            </div>
                        </div>
                        <div className="py-3 px-5 bg-[#03071266] flex flex-col gap-2 w-full rounded">
                            <div className="text-gray-500 text-sm">Total Withdrawal</div>
                            <div className="text-white text-lg font-bold">
                                $ {totalWithdrawal}
                            </div>
                        </div>
                        <div className="py-3 px-5 bg-[#03071266] flex flex-col gap-2 w-full rounded">
                            <div className="text-gray-500 text-sm">Total Fee Earnings</div>
                            <div className="text-white text-lg font-bold">
                                $ {totalFee}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-3 md:flex-row justify-between items-center select-none'>
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <div>
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
                    <div className='flex justify-end w-full md:w-auto items-center gap-3'>
                        <Button
                            size='lg'
                            iconOnly
                            className='flex items-center gap-2'
                        >
                            <span>Export</span>
                            <ArrowDown aria-hidden="true"/>
                        </Button>
                    </div>
                </div>
                <div>
                    <CompanyEarningTable searchVal={searchVal} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}