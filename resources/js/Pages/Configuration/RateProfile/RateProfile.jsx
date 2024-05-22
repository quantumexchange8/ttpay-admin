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

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Rate Profile"
        >
            <Head title="Rate Profile" />

            <div className='flex gap-5 flex-col'>
                <div className='w-full flex justify-between items-center select-none'>
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
                            handleChange={onHandleChange}
                            required
                            // cursorColor="#5200FF"
                            withIcon
                        />
                    </InputIconWrapper>
                    <NewRateProfile onNewRateProfileAdded={handleNewRateProfileAdded}/>
                    
                </div>

                <div>
                    <RateProfileTable key={refreshTable.toString()}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
