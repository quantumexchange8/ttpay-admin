import React from "react";
import Tooltip from "@/Components/Tooltip";
import { Head, useForm, usePage } from '@inertiajs/react';
import Button from "@/Components/Button";
import { Switch } from "@headlessui/react";
import { useState, useEffect } from 'react'
import Modal from "@/Components/Modal";
import { FeatureWarningIcon } from "@/Components/Icon/Icon";
import toast from 'react-hot-toast';

export default function SwitchStatus({ merchant, fetchDataCallback }) {

    const [enabled, setEnabled] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState(null);

    const handleEdit = () => {
        setActionType('edit');
        setIsOpen(true);

    };

    useEffect(() => {
        setEnabled(merchant.status === 'Active');
    }, [merchant.status]);

    const closeModal = () => {
        setIsOpen(false)
        setEnabled(!enabled);
    }

    const handleSwitchChange = () => {
        
        setEnabled(!enabled);
        setIsOpen(true);
    };

    

    const { data, setData, post, processing, errors, reset } = useForm({
        id: merchant.id,
        status: merchant.status === 'Active'  ? 'Inactive' : 'Active'
    }) 

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/merchant/updateStatus', {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsLoading(false);
                if(merchant.status === 'Active') {
                    toast.success('Merchant has been deactivated', { 
                        title: 'Merchant has been deactivated',
                        variant: 'variant3',
                        duration: 3000
                    });
                } else {
                    toast.success('Merchant has been Activated', { 
                        title: 'Merchant has been Activated',
                        variant: 'variant3',
                        duration: 3000
                    });
                }

                fetchDataCallback();
            }, 
            onError: (error) => {
                console.log('error')
                setIsLoading(false);
                
            }
        })
    }

    return (
        <div className="flex justify-center items-center gap-3">
            <Switch
                checked={enabled}
                onChange={handleSwitchChange}
                className={`${enabled ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-3' : 'translate-x-0'}
                    pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>

            <Modal show={isOpen} onClose={closeModal} maxWidth='md' showCloseButton={actionType === 'edit'}>
                {
                    enabled === true ? (
                        <form onSubmit={submit}>
                            <div className='flex flex-col items-center justify-center gap-8'>
                                <div>
                                    <FeatureWarningIcon/> 
                                </div>
                                <div className='flex flex-col items-center gap-1'>
                                    <span className='text-md text-white font-bold text-center'>Active Merchant Confirmation</span>
                                    <span className='text-sm text-gray-400 text-center'>Are you sure you want to activate this merchant?</span>
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
                                        'Activate'
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
                                    <span className='text-md text-white font-bold text-center'>Deactivate Merchant Confirmation</span>
                                    <span className='text-sm text-gray-400 text-center'>Are you sure you want to deactivate this merchant? This action will block their access to the TTPAY mobile app.</span>
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
                                        'Deactivate'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )
                }
                
            </Modal>
        </div>
    )
}