import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Edit, Delete, FeatureWarningIcon } from '@/Components/Icon/Icon';
import Tooltip from "@/Components/Tooltip";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';
import { infinity } from 'ldrs';
import Dropdown from "@/Components/Dropdown";
import { Menu } from '@headlessui/react'

export default function Action({ trc20Address, fetchDataCallback }) {

    const walletTypes = [
        { name: 'TRC-20', value: 'trc-20'},
        { name: 'BEP-20', value: 'bep-20'},
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState(null);
    
    const handleEdit = () => {
        setActionType('edit');
        setIsOpen(true);

    };

    const handleDelete = () => {
        setActionType('delete');
        setIsOpen(true);
    };
    
    const closeModal = () => {
        setIsOpen(false)
        reset();
    }

    const user = usePage().props.auth.user

    const { data, setData, post, processing, errors, reset } = useForm({
        id: trc20Address.id,
        name: trc20Address.name,
        token_address: trc20Address.token_address,
        wallet_type: trc20Address.wallet_type,
    })

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(actionType === 'edit') {
            post('/configuration/edit_trc20_address', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    reset();
                    toast.success('New changes updated', {
                        title: 'New changes updated',
                        duration: 3000,
                        variant: 'variant3',
                    });
    
                    fetchDataCallback();
                }, 
                onError: () => {
                    setIsLoading(false);
                }
            })
        } else {
            post('/configuration/delete_trc20_address', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    toast.success('TRC-20 address has been deleted!', {
                        title: 'TRC-20 address has been deleted!',
                        duration: 3000,
                        variant: 'variant3',
                    });
                    fetchDataCallback();
                }, 
                onError: (error) => {
                    console.log('error')
                    setIsLoading(false);
                    
                }
            })
            
        }
    }

    return (
        <div className="flex justify-center items-center gap-3">
            <Tooltip text="Edit">
                <Button
                    type="button"
                    pill
                    onClick={handleEdit}
                    className="bg-transparent hover:bg-transparent"
                >
                    <Edit width={14} height={14} />
                </Button>
            </Tooltip>

            <Tooltip text="Delete">
                <Button
                    type="button"
                    pill
                    onClick={handleDelete}
                    className="bg-transparent hover:bg-transparent"
                >
                    <Delete width={14} height={14} color="#dc2626"/>
                </Button>
                
            </Tooltip>

            <Modal show={isOpen} onClose={closeModal} title={actionType === 'edit' ? 'Edit Rate Profile' : ''} maxWidth='md' showCloseButton={actionType === 'edit'}>
                {actionType === 'edit' ? (
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
                                        // required
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
                                    <InputError message={errors.name}/>
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
                                        // required
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
                                    'Save Changes'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={submit}>
                        <div className='flex flex-col items-center justify-center gap-8'>
                            <div>
                                <FeatureWarningIcon/> 
                            </div>
                            <div className='flex flex-col items-center gap-1'>
                                <span className='text-md text-white font-bold text-center'>Are you sure you want to delete this TRC-20 address?</span>
                                <span className='text-sm text-gray-400 text-center'>This action cannot be undone and the deleted item will be removed permanently</span>
                            </div>
                            <div className='flex justify-center gap-3 w-full'>
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
                                    variant='danger'
                                    className='w-full flex justify-center'
                                    disabled={isLoading}
                                >
                                    {isLoading ? ( // Show loading indicator if isLoading is true
                                    <l-dot-pulse size="43" speed="1.3" color="white" />
                                    ) : (
                                    'Delete'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
                
            </Modal>
        </div>
    )
}