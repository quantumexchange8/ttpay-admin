import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Edit, Delete, FeatureWarningIcon, InfoIcon } from '@/Components/Icon/Icon';
import Tooltip from "@/Components/Tooltip";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';
import { infinity } from 'ldrs';
import { ApproveIcon, FreezeIcon, RejectIcon } from '@/Components/Icon/Brand';
import { formatDateTime } from '@/Composables';

export default function Action({ transaction, fetchDataCallback }) {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState(null);
    
    const handleEdit = () => {
        setActionType('approve');
        setIsOpen(true);

    };

    const handleReject = () => {
        setActionType('reject');
        setIsOpen(true);
    };

    const handleFreeze = () => {
        setActionType('freeze');
        setIsOpen(true);
    };
    
    const closeModal = () => {
        setIsOpen(false)
        reset();
    }

    const user = usePage().props.auth.user

    const { data, setData, post, processing, errors, reset } = useForm({
        id: transaction.id,
        merchant_id: transaction.merchant.id,
        usdt_address: '',
        txID: '',
        description: '',
    })

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(actionType === 'approve') {
            post('/approvePendingTransaction', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    reset();
                    toast.success('You have successfully approved a merchant\'s withdrawal!', {
                        title: 'You have successfully approved a merchant\'s withdrawal!',
                        duration: 3000,
                        variant: 'variant3',
                    });
    
                    fetchDataCallback();
                }, 
                onError: () => {
                    setIsLoading(false);
                }
    
            })
        } else if (actionType === 'freeze') {
            post('/freezePendingTransaction', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    reset();
                    toast.success('You have successfully approved a merchant\'s withdrawal!', {
                        title: 'You have successfully approved a merchant\'s withdrawal!',
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
            post('/rejectPendingTransaction', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    toast.success('You have successfully rejected a merchant\'s withdrawal!', {
                        title: 'You have successfully rejected a merchant\'s withdrawal!',
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

    const getTitle = () => {
        switch (actionType) {
            case 'approve':
                return 'Approve Merchant\'s Withdrawal';
            case 'reject':
                return 'Reject Merchant\'s Withdrawal';
            case 'freeze':
                return 'Freeze Merchant\'s Withdrawal';
            default:
                return '';
        }
    };


    return (
        <div className="flex justify-center items-center gap-3">
            <Tooltip text="Approve">
                <Button
                    type="button"
                    pill
                    onClick={handleEdit}
                    className="bg-transparent hover:bg-transparent"
                >
                    <ApproveIcon width={14} height={14} />
                </Button>
            </Tooltip>

            <Tooltip text="Reject">
                <Button
                    type="button"
                    pill
                    onClick={handleReject}
                    className="bg-transparent hover:bg-transparent"
                >
                    <RejectIcon width={14} height={14} color="#dc2626"/>
                </Button>
            </Tooltip>

            <Tooltip text="Freeze">
                <Button
                    type="button"
                    pill
                    onClick={handleFreeze}
                    className="bg-transparent hover:bg-transparent"
                >
                    <FreezeIcon width={14} height={14} color="#dc2626"/>
                </Button>
            </Tooltip>

            <Modal show={isOpen} onClose={closeModal} title={getTitle()}  maxWidth='lg'>
                {actionType === 'approve' ? (
                    <form onSubmit={submit}>
                        <div className='flex flex-col gap-12'>
                            <div className='flex flex-col gap-5'>
                                <div className="flex flex-col gap-2">
                                    <div className='flex gap-3'>
                                        <div className=' w-[120px] text-gray-500 text-sm font-bold uppercase'>transaction id</div>
                                        <div className='text-white text-base'>
                                            {transaction.merchant.role_id}
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <div className=' w-[120px] text-gray-500 text-sm font-bold uppercase'>date time</div>
                                        <div className='text-white text-base'>
                                            {formatDateTime(transaction.created_at)}
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <div className=' w-[120px] text-gray-500 text-sm font-bold uppercase'>merchant</div>
                                        <div className='text-white text-base'>
                                            {transaction.merchant.name} ({transaction.merchant.role_id})
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <div className=' w-[120px] text-gray-500 text-sm font-bold uppercase'>net amount</div>
                                        <div className='text-white text-base'>
                                            $ {transaction.amount}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="usdt_address" value="USDT Address"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="usdt_address" 
                                        type='text'
                                        value={data.usdt_address}
                                        handleChange={(e) => setData('usdt_address', e.target.value)}
                                        // required
                                        className="w-full"
                                    />
                                    <InputError message={errors.usdt_address}/>
                                </div>
                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="txID" value="TXID"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="txID" 
                                        type='text'
                                        value={data.txID}
                                        handleChange={(e) => setData('txID', e.target.value)}
                                        // required
                                        className="w-full"
                                    />
                                    <InputError message={errors.txID}/>
                                </div>
                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="description" value="Description (optional)"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="description" 
                                        type='text'
                                        value={data.description}
                                        handleChange={(e) => setData('description', e.target.value)}
                                        // required
                                        className="w-full"
                                        placeholder='Provide a brief description...'
                                    />
                                    <InputError message={errors.description}/>
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
                                    'Approve'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                ) : actionType === 'reject' ? (
                    <form onSubmit={submit}>
                        <div className='flex flex-col gap-12'>
                            <div className='flex flex-col gap-5'>
                                <div className="flex flex-col gap-2">
                                    <div className='flex gap-3'>
                                        <div className=' w-[120px] text-gray-500 text-sm font-bold uppercase'>transaction id</div>
                                        <div className='text-white text-base'>
                                            {transaction.merchant.role_id}
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <div className=' w-[120px] text-gray-500 text-sm font-bold uppercase'>date time</div>
                                        <div className='text-white text-base'>
                                            {formatDateTime(transaction.created_at)}
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <div className=' w-[120px] text-gray-500 text-sm font-bold uppercase'>merchant</div>
                                        <div className='text-white text-base'>
                                            {transaction.merchant.name} ({transaction.merchant.role_id})
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <div className=' w-[120px] text-gray-500 text-sm font-bold uppercase'>net amount</div>
                                        <div className='text-white text-base'>
                                            $ {transaction.amount}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="description" value="Description (optional)"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="description" 
                                        type='text'
                                        value={data.description}
                                        handleChange={(e) => setData('description', e.target.value)}
                                        // required
                                        className="w-full"
                                        placeholder='Provide a brief description...'
                                    />
                                    <InputError message={errors.description}/>
                                </div>
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
                                    className='w-full flex justify-center'
                                    disabled={isLoading}
                                >
                                    {isLoading ? ( // Show loading indicator if isLoading is true
                                    <l-dot-pulse size="43" speed="1.3" color="white" />
                                    ) : (
                                    'Reject'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                ) : actionType === 'freeze' ? (
                    <form onSubmit={submit}>
                        <div className='flex flex-col gap-12'>
                            <div className='flex flex-col gap-5'>
                                <div className='py-3 px-4 flex gap-3 bg-gradient-to-r from-[#0c44ff26] from-10% to-gray-900 to-90% rounded-lg'>
                                    <div className='p-1.5 w-8 h-8 rounded-full bg-gray-800'>
                                        <InfoIcon />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-white text-sm font-semibold'>
                                            What is freeze?
                                        </div>
                                        <div className='text-gray-300 text-sm'>
                                            Freezing the request temporarily pauses its processing for further review. You can unfreeze the request in the freezing listing.
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="description" value="Description (optional)"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="description" 
                                        type='text'
                                        value={data.description}
                                        handleChange={(e) => setData('description', e.target.value)}
                                        // required
                                        className="w-full"
                                        placeholder='Provide a brief description...'
                                    />
                                    <InputError message={errors.description}/>
                                </div>
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
                                    className='w-full flex justify-center'
                                    disabled={isLoading}
                                >
                                    {isLoading ? ( // Show loading indicator if isLoading is true
                                    <l-dot-pulse size="43" speed="1.3" color="white" />
                                    ) : (
                                    'Freeze'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                ): null}
                
            </Modal>
        </div>
    )
}