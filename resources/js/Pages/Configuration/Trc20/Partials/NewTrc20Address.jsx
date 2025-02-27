import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import InputError from '@/Components/InputError';
import Modal from "@/Components/Modal";
import React, { useState } from 'react';
import { AddIcon } from '@/Components/Icon/Icon';
// import CustomToaster from '@/Components/CustomToaster';
import toast from 'react-hot-toast';
import { dotPulse } from 'ldrs'
import Dropdown from "@/Components/Dropdown";
import { Menu } from '@headlessui/react'

export default function NewTrc20Address({ onNewAddressAdded }) {
    
    const walletTypes = [
        { name: 'TRC-20', value: 'trc-20'},
        { name: 'BEP-20', value: 'bep-20'},
    ]

    const [isOpen, modalDetails] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    dotPulse.register()

    const openModal = () => {
        modalDetails(true)
    }

    const closeModal = () => {
        modalDetails(false)
        reset();
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        token_address: '',
        wallet_type: 'trc-20',
    })
    
    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/configuration/add_trc20_address', {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsLoading(false);

                if (onNewAddressAdded) {
                    onNewAddressAdded();
                }

                reset();
                // toast.success('You have successfully created a new TRC-20 address!', { duration: Infinity });
                
                toast.success('New Trc20 created', {
                    title: 'New Trc20 created',
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
        <div className='w-full md:w-auto'>
            <Button 
                size='lg'
                iconOnly
                className='gap-2 w-full md:w-auto justify-center items-center'
                onClick={openModal}
            >
                <AddIcon aria-hidden="true"/>
                New Wallet Address
            </Button>

            <Modal show={isOpen} onClose={closeModal} title="New Wallet Address" maxWidth='md'>
                <form onSubmit={submit}>
                    <div className='flex flex-col gap-12'>
                        <div className='flex flex-col gap-5'>
                            <div className="space-y-1.5">
                                <div className='flex items-center gap-1'>
                                    <Label for="name" value="Wallet Name"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                </div>
                                <Input 
                                    id="name" 
                                    type='text' 
                                    value={data.name}
                                    handleChange={(e) => setData('name', e.target.value)}
                                    isFocused={true}
                                    className="w-full"
                                />
                                <InputError message={errors.name}/>
                            </div>
                            <div className="space-y-1.5">
                                <div className='flex items-center gap-1'>
                                    <Label for="name" value="Wallet Type"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                </div>
                                <Dropdown 
                                    defaultOptions={data.wallet_type}
                                    options={walletTypes.map((walletType, index) => (
                                        <div key={index}>
                                            <Menu.Item>
                                                {({ active }) => (
                                                <button
                                                    type="button"
                                                    className={`group flex w-full items-center rounded-md px-4 py-2 text-sm text-white hover:bg-[#ffffff1a] `}
                                                    onClick={() => setData('wallet_type', walletType.value)}
                                                >
                                                    {walletType.name}
                                                </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    ))}
                                />
                                <InputError message={errors.wallet_type}/>
                            </div>
                            <div className="space-y-1.5">
                                <div className='flex items-center gap-1'>
                                    <Label for="token_address" value="Token Address"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                </div>
                                <Input 
                                    id="token_address" 
                                    type='text'
                                    value={data.token_address}
                                    handleChange={(e) => setData('token_address', e.target.value)}
                                    className="w-full"
                                />
                                <InputError message={errors.token_address}/>
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