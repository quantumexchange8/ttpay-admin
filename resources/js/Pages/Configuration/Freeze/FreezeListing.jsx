import Button from "@/Components/Button";
import { ArrowDown, Search } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import InputIconWrapper from "@/Components/InputIconWrapper";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import toast from 'react-hot-toast';
import FreezeListingTable from "@/Pages/Configuration/Freeze/Partials/FreezeListingTable";
// import CustomDatepicker from "@/Components/DatePicker";

export default function FreezeListing({ auth, total_freezing, total_freezing_amount }) {

    // const showToast = () => {
    //     toast.success('Payout updated', {
    //         title: 'Payout updated',
    //         duration: 3000,
    //         variant: 'variant3',
    //     });
    // }

    const { data, setData, post, processing, errors, reset } = useForm({
        search: '',
    });

    const searchVal = data.search;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Freezing Listing"
        >

            <Head title="Payout Configuration" />


            <div className='flex flex-col gap-5 '>
                <div>
                    {/* {showToast} */}
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div className=" w-full py-3 px-5 flex flex-col gap-2 bg-[#ffffff0d] rounded-xl">
                        <div className="text-gray-500 text-sm">
                            Total Freezing Number
                        </div>
                        <div className="text-white text-xl font-bold">
                            {total_freezing}
                        </div>
                    </div>
                    <div className=" w-full py-3 px-5 flex flex-col gap-2 bg-[#ffffff0d] rounded-xl">
                        <div className="text-gray-500 text-sm">
                            Total Freezing Amount
                        </div>
                        <div className="text-white text-xl font-bold">
                            $ {total_freezing_amount}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
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
                        <div>
                            {/* <CustomDatepicker 
                                selectedDate={selectedDate} 
                                onChange={handleValueChange} 
                            /> */}
                        </div>
                    </div>
                    <div>
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
                    <FreezeListingTable searchVal={searchVal}/>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}