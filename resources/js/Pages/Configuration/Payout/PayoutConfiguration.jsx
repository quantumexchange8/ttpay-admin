import Button from '@/Components/Button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React from "react";
import InputIconWrapper from '@/Components/InputIconWrapper';
import { Search } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import { ArrowDown } from '@/Components/Icon/Icon';
import NewPayoutConfig from '@/Pages/Configuration/Payout/Partials/NewPayoutConfig';
import { useState } from 'react';

export default function PayoutConfiguration({ auth, merchants }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    });

    const searchVal = data.search;
    const [refreshTable, setRefreshTable] = useState(false);

    const handleNewAddressAdded = () => {
        // Set state to trigger table data refresh
        setRefreshTable(prevState => !prevState);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Payout Configuration"
        >

            <Head title="Payout Configuration" />


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
                            handleChange={(e) => setData('search', e.target.value)}
                            required
                            // cursorColor="#5200FF"
                            withIcon
                        />
                    </InputIconWrapper>
                    
                    <div className='flex items-center gap-3'>
                        <NewPayoutConfig merchants={merchants} onNewAddressAdded={handleNewAddressAdded}/>
                        <Button
                            variant='secondary'
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
                    {/* <Trc20Table searchVal={searchVal} key={refreshTable.toString()}/> */}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}