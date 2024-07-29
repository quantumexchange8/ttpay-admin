import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputIconWrapper from '@/Components/InputIconWrapper';
import React, { useState } from 'react';
import { Search, AddIcon, ArrowDown, CsvDownloadIcon } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import PendingTable from '@/Pages/General/Pending/Partials/PendingTable';
import CustomDatepicker from "@/Components/DatePicker";

export default function Pending({ auth }) {

    const [exportCsv, setExportCsv] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const getTodayDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = today.getFullYear();
        return `${year}-${month}-${day}`; // Assuming your placeholder is 'dd/mm/yy'
    };

    const [selectedDate, setSelectedDate] = useState({ 
        startDate: getTodayDate(), 
        endDate: getTodayDate() 
    });

    const handleValueChange = (newValue) => {
        setSelectedDate(newValue);
    }

    const clickCsv = () => {
        setExportCsv(true);
    }

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Pending"
        >
            <Head title="Pending" />

            <div className='flex gap-5 flex-col'>
                <div className='w-full flex justify-between items-center select-none'>
                    <div className='flex gap-3'>
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
                        <div className="w-full md:w-40">
                            <CustomDatepicker 
                                selectedDate={selectedDate} 
                                asSingle={true}
                                onChange={handleValueChange} 
                                placeholder='dd/mm/yy'
                            />
                        </div>
                    </div>
                    {/* <Button
                        size='lg'
                        iconOnly
                        className='flex items-center gap-2'
                        onClick={clickCsv}
                    >
                        <span>Export</span>
                        <CsvDownloadIcon aria-hidden="true"/>
                    </Button> */}
                </div>

                <div>
                    <PendingTable searchVal={searchVal} selectedDate={selectedDate} exportCsv={exportCsv} setExportCsv={setExportCsv}/>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}