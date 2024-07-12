import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { Head, useForm, } from '@inertiajs/react';
import InputIconWrapper from '@/Components/InputIconWrapper';
import { Search, AddIcon } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { ArrowDown } from '@/Components/Icon/Icon';
import MasterMerchantsTable from './Partials/MasterMerchantsTable.jsx'
import { EmptyFilter, FilledFilter } from "@/Components/Icon/Outline";
import MonthSelection from "./Partials/Master_MonthSelection.jsx";
import DealHistory_Filter from "./Partials/Master_DealHistoryFilter.jsx";

export default function DealHistory(){
    const { data, setData} = useForm({
        search: '',
    })

    const searchVal = data.search;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filtersApplied, setFiltersApplied] = useState(false); // state to track if filters are applied
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('All'); // state to track the selected month
    const [appliedFilters, setAppliedFilters] = useState({
        success: false,
        rejected: false,
        minAmount: '',
        maxAmount: '',
        minFee: '',
        maxFee: ''
    });

    const openFilterModal = () => {
        setFilterIsOpen(true);
    };

    const closeFilterModal = () => {
        setFilterIsOpen(false);
    };

    const applyFilters = (filters) => {
        setAppliedFilters(filters);
        setFiltersApplied(true);
        closeFilterModal();
    };

    const resetFilters = () => {
        setAppliedFilters({
            success: false,
            rejected: false,
            minAmount: '',
            maxAmount: '',
            minFee: '',
            maxFee: ''
        });
        setFiltersApplied(false);
    };

    return(
        <Authenticated header="Deal History">
            <Head title="Master - Merchants" />

            <div className="flex flex-col gap-[20px]">
                <div className="text-white sm:text-base md:text-lg lg:text-lg xl:text-lg font-bold">Master - Merchants</div>
                <div className='flex gap-5 flex-col'>
                    <div className='w-full flex justify-between items-center select-none'>
                        <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:items-start items-center sm:gap-3 md:gap-0 lg:gap-0 xl:gap-0 gap-0">
                            <div className="flex">
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
                                        className="block w-full caret-primary-700 py-3"
                                        autoComplete="search"
                                        isFocused={false}
                                        handleChange={(e) => setData('search', e.target.value)}
                                        required
                                        withIcon
                                    />
                                </InputIconWrapper>

                                <div className="md:hidden flex gap-[12px] items-center bg-[#ffffff0d] dark:focus-within:text-gray-400 px-4 py-[14px] rounded-r-lg border-l-[1px] border-neutral-800">
                                    <button
                                        type="filter button"
                                        onClick={openFilterModal}
                                        className="flex gap-[8px]"
                                    >
                                        {filtersApplied ? <FilledFilter /> : <EmptyFilter />}
                                        <div className="text-white text-sm font-semibold justify-center">
                                            Filter
                                        </div>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <div className="hidden md:flex gap-[12px] items-center bg-[#ffffff0d] px-4 py-3 border-l-[1px] border-neutral-800">
                                    <button
                                        type="filter button"
                                        onClick={openFilterModal}
                                        className="flex gap-[8px]"
                                    >
                                        {filtersApplied ? <FilledFilter /> : <EmptyFilter />}
                                        <div className="text-white text-sm font-semibold justify-center">
                                            Filter
                                        </div>
                                    </button>
                                </div>
                                <div className="hidden md:flex items-center bg-[#ffffff0d] px-4 py-2">
                                    <div className="text-white">
                                        <MonthSelection selectedMonth={setSelectedMonth} />
                                    </div>
                                </div>
                            </div>
                            

                            <div className="md:hidden flex flex-col items-center bg-[#ffffff0d] dark:focus-within:text-gray-400 rounded-lg">
                                <div className="md:hidden flex px-4 py-2">
                                    <div className="text-white">
                                        <MonthSelection selectedMonth={setSelectedMonth} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='hidden md:flex items-center gap-3'>
                            <Button
                                variant='primary'
                                size='lg'
                                iconOnly
                                className='flex items-center gap-2'
                            >
                                <span>Export</span>
                                <ArrowDown aria-hidden="true" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="relative sm:bottom-[50px] md:bottom-0 lg:bottom-0 xl:bottom-0">
                    {filterIsOpen && (
                        <div>
                            <DealHistory_Filter 
                                closeFilter={closeFilterModal} 
                                applyFilters={applyFilters} 
                                resetFilters={resetFilters} 
                                remainOptions={appliedFilters} // Pass appliedFilters
                            />
                        </div>
                    )}
                </div>

                <div>
                    <MasterMerchantsTable 
                        searchVal={searchVal} 
                        selectedMonth={selectedMonth} 
                        appliedFilters={appliedFilters}
                    />
                </div>
            </div>
        </Authenticated>
    );
}