import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from "@inertiajs/react";
import InputIconWrapper from "@/Components/InputIconWrapper";
import { ArrowDown, Search } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import CompanyEarningTable from "./Partials/CompanyEarningTable";

export default function CompanyEarning({ auth, totalMerchant, totalDeposit, totalWithdrawal, totalFee }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    })

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Company Earnings"
        >
            <Head title="Company Earnings" />
            <div className='flex gap-5 flex-col'>
                <div className="w-full p-5 bg-[#ffffff0d] rounded-xl flex flex-col gap-5">
                    <div className="text-gray-50 text-lg font-bold">
                        Overview Data
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="py-3 px-5 bg-[#03071266] flex flex-col gap-2 w-full rounded">
                            <div className="text-gray-500 text-sm">Total Merchant</div>
                            <div className="text-white text-lg font-bold">
                                {totalMerchant}
                            </div>
                        </div>
                        <div className="py-3 px-5 bg-[#03071266] flex flex-col gap-2 w-full rounded">
                            <div className="text-gray-500 text-sm">Total Deposit</div>
                            <div className="text-white text-lg font-bold">
                                $ {totalDeposit}
                            </div>
                        </div>
                        <div className="py-3 px-5 bg-[#03071266] flex flex-col gap-2 w-full rounded">
                            <div className="text-gray-500 text-sm">Total Withdrawal</div>
                            <div className="text-white text-lg font-bold">
                                $ {totalWithdrawal}
                            </div>
                        </div>
                        <div className="py-3 px-5 bg-[#03071266] flex flex-col gap-2 w-full rounded">
                            <div className="text-gray-500 text-sm">Total Fee Earnings</div>
                            <div className="text-white text-lg font-bold">
                                $ {totalFee}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-between items-center select-none'>
                    <div className="flex flex-row gap-3">
                        <div>
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
                        <div></div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Button
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
                    <CompanyEarningTable searchVal={searchVal} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}