import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Edit, Delete, FeatureWarningIcon, RecoverIcon } from '@/Components/Icon/Icon';
import Tooltip from "@/Components/Tooltip";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';
import { infinity } from 'ldrs';

export default function Action({ merchant, fetchDataCallback }) {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState(null);
    
    const handleRecover = () => {
        setActionType('recover');
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
    
    const { data, setData, post, processing, errors, reset } = useForm({
        id: merchant.id,
    })

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(actionType === 'recover') {
            post('/merchant/recoverMerchant', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    reset();
                    toast.success('Merchant recovered', {
                        title: 'Merchant recovered',
                        duration: Infinity,
                        description: 'You have successfully recovered the merchant back to the portal. Check it out in the merchant listing.',
                        variant: 'variant1',
                        actionText: 'Go to merchant listing',
                        action: () => window.location.href = route('merchant.merchant-listing')
                    });
                    fetchDataCallback();
                }, 
                onError: () => {
                    setIsLoading(false);
                }
    
            })
        } else {
            post('/merchant/removeMerchant', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    toast.success('Merchant has been deleted permanently!', { duration: 3000 });
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
            <Tooltip text="Recover">
                <Button
                    type="button"
                    pill
                    onClick={handleRecover}
                    className="bg-transparent hover:bg-transparent"
                >
                    <RecoverIcon width={14} height={14} />
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

            <Modal show={isOpen} onClose={closeModal} title='' maxWidth='md' showCloseButton={actionType === ''}>
                {actionType === 'recover' ? (
                    <form onSubmit={submit}>
                        <div className='flex flex-col items-center justify-center gap-8'>
                            <div>
                                <FeatureWarningIcon/> 
                            </div>
                            <div className='flex flex-col items-center gap-1'>
                                <span className='text-md text-white font-bold text-center'>Are you sure you want to recover this merchant?</span>
                                <span className='text-sm text-gray-400 text-center'>Recovering the merchant will restore it to its previous state before deletion.</span>
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
                                    variant='primary'
                                    className='w-full flex justify-center'
                                    disabled={isLoading}
                                >
                                    {isLoading ? ( // Show loading indicator if isLoading is true
                                    <l-dot-pulse size="43" speed="1.3" color="white" />
                                    ) : (
                                    'Recover'
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
                                <span className='text-md text-white font-bold text-center'>Are you sure you want to delete this merchant?</span>
                                <span className='text-sm text-gray-400 text-center'>This action cannot be undone and the deleted item will be removed permanently.</span>
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