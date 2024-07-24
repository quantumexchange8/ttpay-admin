import { Search } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import InputIconWrapper from "@/Components/InputIconWrapper";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import MerchantTransactionTable from "@/Pages/General/DealHistory/Merchant/Partials/MerchantTransactionTable"

export default function Merchant({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Deal History"
        >

            <Head title="Deal History" />
            
            <div className='flex gap-5 flex-col'>
                <div className="text-gray-50 text-lg font-bold">
                    Master - Merchants
                </div>
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
                </div>
                <div>
                    <MerchantTransactionTable searchVal={searchVal}/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}