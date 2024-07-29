import { ArrowDown, Search } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import InputIconWrapper from "@/Components/InputIconWrapper";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import MerchantTransactionTable from "@/Pages/General/DealHistory/Merchant/Partials/MerchantTransactionTable"
import CustomDatepicker from "@/Components/DatePicker";
import Button from "@/Components/Button";
import { useState } from "react";
import CustomMonthpicker from "@/Components/CustomMonthPicker";
import { startOfMonth, endOfMonth, addMonths, format } from 'date-fns';
import { useEffect } from "react";
import Filter from "@/Components/FilterTable";
import Dropdown from "@/Components/Dropdown";
import { Menu } from '@headlessui/react'

export default function Merchant({ auth }) {

    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState();
    const [exportCsv, setExportCsv] = useState(false);
    
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

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleApplyFilters = (filters) => {
        setFilters(filters)
    };

    const handleExportCsv = () => {
        setExportCsv(true)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Deal History"
        >

            <Head title="Deal History" />
            
            <div className='flex gap-5 flex-col py-5 md:py-0'>
                <div className="text-gray-50 text-lg font-bold">
                    Master - Merchants
                </div>
                <div className='w-full flex flex-col gap-3 md:flex-row justify-between items-center select-none'>
                    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                        <div className="flex items-center w-full md:w-auto">
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
                                    className="block w-full caret-primary-700 rounded-r-none"
                                    autoComplete="search"
                                    isFocused={false}
                                    handleChange={(e) => setData('search', e.target.value)}
                                    required
                                    // cursorColor="#5200FF"
                                    withIcon
                                />

                            </InputIconWrapper>
                            <Filter onApply={handleApplyFilters} statuses='Rejected' />
                        </div>
                        

                        <div className="w-full md:w-40">
                            {/* <CustomMonthpicker 
                                selectedMonth={selectedDate.startDate}
                                asSingle={true}
                                onChange={handleValueChange} 
                                placeholder='YYYY/MM'
                            /> */}
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
                    <div className=" w-full flex justify-end">
                        <Button
                            size='lg'
                            iconOnly
                            className='flex items-center gap-2'
                            onClick={handleExportCsv}
                        >
                            <span>Export</span>
                            <ArrowDown aria-hidden="true"/>
                        </Button>
                    </div>
                    
                </div>
                <div>
                    <MerchantTransactionTable 
                        searchVal={searchVal} 
                        filters={filters} 
                        selectedMonthStart={formatDate(selectedMonth.startDate)} 
                        selectedMonthEnd={formatDate(selectedMonth.endDate)} 
                        exportCsv={exportCsv}
                        setExportCsv={setExportCsv}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}