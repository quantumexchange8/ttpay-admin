import Button from "@/Components/Button";
import { AddIcon } from "@/Components/Icon/Icon";
import Modal from "@/Components/Modal";
import React from "react";
import { useState } from "react";
import { dotPulse } from 'ldrs'
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import InputError from "@/Components/InputError";
import Dropdown from "@/Components/Dropdown";
import { useEffect } from "react";
import { Menu } from '@headlessui/react'
import { useForm } from '@inertiajs/react';

export default function NewPayoutConfig({ merchants, onNewAddressAdded }) {

    const [isOpen, modalDetails] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    dotPulse.register()

    const [selectedMerchant, setSelectedMerchant] = useState(null);

    const openModal = () => {
        modalDetails(true)
    }

    const closeModal = () => {
        modalDetails(false)
        reset();
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        merchant_id: '',
        live_paymentUrl: '',
        appId: '',
        returnUrl: '',
        callbackUrl: '',
    });

    useEffect(() => {
        if (selectedMerchant && data.merchant_id !== selectedMerchant.id) {
            setData('merchant_id', selectedMerchant.id);
        }
    }, [
        selectedMerchant,
        data.merchant_id,
        setData
    ])


    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/configuration/storePayout', {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsLoading(false);

                if (onNewAddressAdded) {
                    onNewAddressAdded();
                }

                reset();
                // toast.success('You have successfully created a new TRC-20 address!', { duration: Infinity });
                
                toast.success('New merchant created', {
                    title: 'New merchant created',
                    duration: 3000,
                    variant: 'variant3',
                });
            }, 
            onError: () => {
                setIsLoading(false);
            }

        })
    }

    return (
        <div className="w-full md:w-auto">
            <Button
                size='lg'
                iconOnly
                className='gap-2 justify-center items-center w-full md:w-auto'
                onClick={openModal}
            >
                <AddIcon aria-hidden="true"/>
                New Payout
            </Button>


            <Modal show={isOpen} onClose={closeModal} title="New Payout" maxWidth='md'>
                <form onSubmit={submit}>
                    <div className='flex flex-col gap-12'>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <div className='flex items-center gap-1'>
                                        <Label for="name" value="Payout Name" className='w-24' />
                                    </div>
                                    <Input 
                                        id="name" 
                                        type='text' 
                                        value={data.name}
                                        handleChange={(e) => setData('name', e.target.value)}
                                        isFocused={true}
                                        className="w-full"
                                    />
                                </div>
                                <InputError message={errors.name}/>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className='flex items-center gap-1'>
                                    <Label for="merchant" value="Merchant" className='w-24' />
                                </div>
                                <Dropdown 
                                    defaultOptions={selectedMerchant ? selectedMerchant.name : <span className='text-gray-500 text-base'>Select</span>}
                                    options={merchants.map((merchant, index) => (
                                        <div key={index}>
                                            <Menu.Item>
                                                {({ active }) => (
                                                <button
                                                    type="button"
                                                    className={`group flex w-full items-center rounded-md px-4 py-2 text-sm text-white hover:bg-[#ffffff1a] ${merchant.id === (selectedMerchant ? selectedMerchant.id : null) ? 'bg-[#ffffff1a]' : ''}`}
                                                    onClick={() => setSelectedMerchant(merchant)}
                                                >
                                                    {merchant.name}
                                                </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    ))}
                                />
                                <InputError message={errors.merchant}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <div className='flex items-center gap-1'>
                                        <Label for="live_paymentUrl" value="Payment Url" className='w-24' />
                                    </div>
                                    <Input 
                                        id="live_paymentUrl" 
                                        type='text' 
                                        value={data.live_paymentUrl}
                                        handleChange={(e) => setData('live_paymentUrl', e.target.value)}
                                        isFocused={true}
                                        className="w-full"
                                    />
                                </div>
                                <InputError message={errors.live_paymentUrl}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <div className='flex items-center gap-1'>
                                        <Label for="appId" value="App ID" className='w-24' />
                                    </div>
                                    <Input 
                                        id="appId" 
                                        type='text' 
                                        value={data.appId}
                                        handleChange={(e) => setData('appId', e.target.value)}
                                        isFocused={true}
                                        className="w-full"
                                    />
                                </div>
                                <InputError message={errors.appId}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <div className='flex items-center gap-1'>
                                        <Label for="returnUrl" value="Return Url" className='w-24' />
                                    </div>
                                    <Input 
                                        id="returnUrl" 
                                        type='text' 
                                        value={data.returnUrl}
                                        handleChange={(e) => setData('returnUrl', e.target.value)}
                                        isFocused={true}
                                        className="w-full"
                                    />
                                </div>
                                <InputError message={errors.returnUrl}/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <div className='flex items-center gap-1'>
                                        <Label for="callbackUrl" value="Callback Url" className='w-24' />
                                    </div>
                                    <Input 
                                        id="callbackUrl" 
                                        type='text' 
                                        value={data.callbackUrl}
                                        handleChange={(e) => setData('callbackUrl', e.target.value)}
                                        isFocused={true}
                                        className="w-full"
                                    />
                                </div>
                                <InputError message={errors.callbackUrl}/>
                            </div>
                        </div>
                        <div className='flex justify-center gap-3'>
                            <Button
                                variant='secondary'
                                size='lg'
                                className='w-full flex justify-center'
                                onClick={closeModal}
                                type='button'
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size='lg'
                                className='w-full flex justify-center'
                                disabled={isLoading}
                            >
                                {isLoading ? ( // Show loading indicator if isLoading is true
                                <l-dot-pulse size="43" speed="1.3" color="white" />
                                ) : (
                                'Create'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}