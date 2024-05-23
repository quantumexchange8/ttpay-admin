import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Head, useForm, } from '@inertiajs/react';
import InputIconWrapper from '@/Components/InputIconWrapper';
import { Search, AddIcon } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import { ArrowDown } from '@/Components/Icon/Icon';
import MerchantListingTable from '@/Pages/Merchant/MerchantListing/Partials/MerchantListingTable'

export default function MerchantListing({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
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
        <Authenticated
            user={auth.user}
            header="Merchant Listing"
        >

            <Head title="Merchant Listing" />

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
                    <MerchantListingTable />
                </div>
            </div>

        </Authenticated>
    )
}