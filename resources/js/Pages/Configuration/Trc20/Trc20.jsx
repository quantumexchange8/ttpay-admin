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
import { Tab } from '@headlessui/react'
import Bep20Table from './Partials/Bep20Table';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function RateProfile({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const [refreshTable, setRefreshTable] = useState(false);
    const [exportCsv, setExportCsv] = useState(false);

    const handleNewAddressAdded = () => {
        // Set state to trigger table data refresh
        setRefreshTable(prevState => !prevState);
    };

    const handleExportCsv = () => {
        setExportCsv(true)
    }

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Wallet Address"
        >
            <Head title="Wallet Address" />

            <div className='flex gap-5 flex-col py-5 md:py-0'>
                <div className='w-full flex flex-col md:flex-row justify-between items-center select-none'>
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
                    
                    <div className='flex w-full md:w-auto flex-col md:flex-row items-center gap-3'>
                        <NewTrc20Address onNewAddressAdded={handleNewAddressAdded}/>
                        <div className='flex justify-end w-full md:w-auto'>
                            <Button
                                variant='secondary'
                                size='lg'
                                iconOnly
                                className='flex items-center gap-2'
                                onClick={handleExportCsv}
                            >
                                <span>Export</span>
                                <ArrowDown aria-hidden="true"/>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <Tab.Group>
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
                                TRC-20
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
                                BEP-20
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel
                                className={classNames(
                                    'focus:outline-none'
                                )}
                            >
                                <div>
                                    <Trc20Table 
                                        searchVal={searchVal} 
                                        key={refreshTable.toString()} 
                                        exportCsv={exportCsv}
                                        setExportCsv={setExportCsv}
                                    />
                                </div>
                            </Tab.Panel>
                            <Tab.Panel
                                className={classNames(
                                    'focus:outline-none'
                                )}
                            >
                                <div>
                                    <Bep20Table 
                                        searchVal={searchVal} 
                                        key={refreshTable.toString()} 
                                        exportCsv={exportCsv}
                                        setExportCsv={setExportCsv}
                                    />
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>

                
            </div>
        </AuthenticatedLayout>
    );
}
