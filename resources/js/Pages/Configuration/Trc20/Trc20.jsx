import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, } from '@inertiajs/react';
import React, { useState } from 'react';
import InputIconWrapper from '@/Components/InputIconWrapper';
import { Search, AddIcon } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import NewTrc20Address from '@/Pages/Configuration/Trc20/Partials/NewTrc20Address'
import Trc20Table from '@/Pages/Configuration/Trc20/Partials/Trc20Table'
import Button from '@/Components/Button';
import { ArrowDown } from '@/Components/Icon/Icon';

export default function RateProfile({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const [refreshTable, setRefreshTable] = useState(false);

    const handleNewAddressAdded = () => {
        // Set state to trigger table data refresh
        setRefreshTable(prevState => !prevState);
    };

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Trc-20 Address"
        >
            <Head title="Trc-20 Address" />

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
                        <NewTrc20Address onNewAddressAdded={handleNewAddressAdded}/>
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
                    <Trc20Table searchVal={searchVal} key={refreshTable.toString()}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
