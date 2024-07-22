import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputIconWrapper from '@/Components/InputIconWrapper';
import React, { useState } from 'react';
import { Search, AddIcon, ArrowDown } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import PendingTable from '@/Pages/General/Pending/Partials/PendingTable';

export default function Pending({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Pending"
        >
            <Head title="Pending" />

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
                <Button
                    size='lg'
                    iconOnly
                    className='flex items-center gap-2'
                >
                    <span>Export</span>
                    <ArrowDown aria-hidden="true"/>
                </Button>
                </div>

                <div>
                    <PendingTable searchVal={searchVal}/>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}