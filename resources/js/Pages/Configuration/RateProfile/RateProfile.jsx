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
        name: '',
        deposit_fee: '',
        withdrawal_fee: '',
    })

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
                <div className='w-full flex justify-between items-center'>
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
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            className="block w-full"
                            autoComplete="name"
                            isFocused={false}
                            handleChange={onHandleChange}
                            required
                            cursorColor="#5200FF"
                            withIcon
                        />
                    </InputIconWrapper>
                    <NewRateProfile/>
                    
                </div>

                <div>
                    <RateProfileTable/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
