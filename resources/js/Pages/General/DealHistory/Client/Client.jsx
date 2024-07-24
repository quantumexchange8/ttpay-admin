import { Search } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import InputIconWrapper from "@/Components/InputIconWrapper";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import ClientTransactionTable from "@/Pages/General/DealHistory/Client/Partials/ClientTransactionTable"
import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Client({ auth }) {

    const [selectedTab, setSelectedTab] = useState('deposit');

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
                    Merchants - Clients
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
                <div className="flex flex-col">
                    <div className="w-full">
                        <Tab.Group
                            onChange={(index) => {
                                // Update the selectedTab state based on the selected tab index
                                setSelectedTab(index === 0 ? 'deposit' : 'withdrawal');
                            }}
                        >
                            <Tab.List className="flex py-5 px-3">
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                        'p-3 text-sm font-semibold leading-none',
                                        'focus:outline-none',
                                        selected
                                            ? 'bg-transparent text-white border-b-2 border-gray-300'
                                            : 'text-gray-500 hover:bg-gray-900 rounded-t-md hover:text-white'
                                        )
                                    }
                                >
                                    Deposit
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                        'p-3 text-sm font-semibold leading-none',
                                        'focus:outline-none',
                                        selected
                                            ? 'bg-transparent text-white border-b-2 border-gray-300'
                                            : 'text-gray-500 hover:bg-gray-900 rounded-t-md hover:text-white'
                                        )
                                    }
                                >
                                    Withdrawal
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                <Tab.Panel
                                    className={classNames(
                                        'focus:outline-none'
                                    )}
                                >
                                    <ClientTransactionTable searchVal={searchVal} transactionType={selectedTab} />
                                </Tab.Panel>
                                <Tab.Panel
                                    className={classNames(
                                        'focus:outline-none'
                                    )}
                                >
                                    <ClientTransactionTable searchVal={searchVal} transactionType={selectedTab} />
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                        </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    )
}