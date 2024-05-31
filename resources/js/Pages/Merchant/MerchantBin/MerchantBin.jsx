import Button from "@/Components/Button";
import { ArrowDown, Search } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import InputIconWrapper from "@/Components/InputIconWrapper";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from '@inertiajs/react';
import React from "react";
import MerchantBinTable from '@/Pages/Merchant/MerchantBin/Partials/MerchantBinTable'
import CustomDatepicker from "@/Components/DatePicker";
import { useState } from "react";

export default function MerchantBin({ }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })
    const [selectedDate, setSelectedDate] = useState({ 
        startDate: null, 
        endDate: null 
    });

    const handleValueChange = (newValue) => {
        setSelectedDate(newValue);
    }

    const searchVal = data.search;

    return (
        <Authenticated
            header="Merchant Bin"
        >

            <Head title="Merchant Bin" />

            <div className='flex gap-5 flex-col'>
                <div className='w-full flex justify-between items-center select-none'>
                    <div className="flex items-center gap-3">
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
                                placeholder="Search merchant ID"
                                value={data.search}
                                className="block w-full caret-primary-700 py-3"
                                autoComplete="search"
                                isFocused={false}
                                handleChange={(e) => setData('search', e.target.value)}
                                required
                                withIcon
                            />
                        </InputIconWrapper>
                        <div className="w-60">
                            <CustomDatepicker 
                                selectedDate={selectedDate} 
                                onChange={handleValueChange} 
                            />
                        </div>
                    </div>

                    <div className='flex items-center gap-3'>
                        <Button
                            variant='primary'
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
                    <MerchantBinTable searchVal={searchVal} selectedDate={selectedDate}/>
                </div>
            </div>
        </Authenticated>
    )
}