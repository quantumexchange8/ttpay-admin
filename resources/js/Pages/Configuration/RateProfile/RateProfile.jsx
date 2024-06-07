import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputIconWrapper from '@/Components/InputIconWrapper';
import { Search, AddIcon } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import RateProfileTable from '@/Pages/Configuration/RateProfile/Partials/RateProfileTable';
import React, { useState } from 'react';
import NewRateProfile from "@/Pages/Configuration/RateProfile/Partials/NewRateProfile";

export default function RateProfile({ auth }) {
    

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const [refreshTable, setRefreshTable] = useState(false);

    const handleNewRateProfileAdded = () => {
        // Set state to trigger table data refresh
        setRefreshTable(prevState => !prevState);
    };

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Rate Profile"
        >
            <Head title="Rate Profile" />

            <div className='flex gap-5 flex-col'>
                <div className='hidden md:flex w-full justify-between items-center select-none'>
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
                    <NewRateProfile onNewRateProfileAdded={handleNewRateProfileAdded}/>
                </div>

                <div className='w-full flex flex-col gap-3 justify-between select-none md:hidden'>
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
                    <div className='flex flex-col sm:items-end'>
                    <NewRateProfile onNewRateProfileAdded={handleNewRateProfileAdded}/></div>
                </div>

                <div>
                    <RateProfileTable searchVal={searchVal} key={refreshTable.toString()}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
