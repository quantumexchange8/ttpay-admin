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

export default function Action({ payout, fetchDataCallback }) {

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
        id: payout.id,
        name: payout.name,
        live_paymentUrl: payout.live_paymentUrl,
        appId: payout.appId,
        returnUrl: payout.returnUrl,
        callBackUrl: payout.callBackUrl,
        // token_address: payout.token_address,
    })

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(actionType === 'edit') {
            post('/configuration/edit_payout', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    reset();
                    toast.success('Payout updated', {
                        title: 'Payout updated',
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
            post('/configuration/delete_payout', {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    setIsLoading(false);
                    toast.success('TRC-20 address has been deleted!', { duration: 3000 });
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

            <Modal show={isOpen} onClose={closeModal} title={actionType === 'edit' ? 'Edit Payout' : ''} maxWidth='md' showCloseButton={actionType === 'edit'}>
                {actionType === 'edit' ? (
                    <form onSubmit={submit}>
                        <div className='flex flex-col gap-12'>
                            <div className='flex flex-col gap-5'>
                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="name" value="Payout Name"/> <span className='text-sm text-error-600 font-medium'>*</span>
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
                                        <Label for="live_paymentUrl" value="Payment Url"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="live_paymentUrl" 
                                        type='text'
                                        value={data.live_paymentUrl}
                                        handleChange={(e) => setData('live_paymentUrl', e.target.value)}
                                        // required
                                        className="w-full"
                                    />
                                    <InputError message={errors.live_paymentUrl}/>
                                </div>
                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="appId" value="App ID"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="appId" 
                                        type='text'
                                        value={data.appId}
                                        handleChange={(e) => setData('appId', e.target.value)}
                                        // required
                                        className="w-full"
                                    />
                                    <InputError message={errors.appId}/>
                                </div>
                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="returnUrl" value="Return Url"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="returnUrl" 
                                        type='text'
                                        value={data.returnUrl}
                                        handleChange={(e) => setData('returnUrl', e.target.value)}
                                        // required
                                        className="w-full"
                                    />
                                    <InputError message={errors.returnUrl}/>
                                </div>
                                <div className="space-y-1.5">
                                    <div className='flex items-center gap-1'>
                                        <Label for="callBackUrl" value="Callback Url"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                    </div>
                                    <Input 
                                        id="callBackUrl" 
                                        type='text'
                                        value={data.callBackUrl}
                                        handleChange={(e) => setData('callBackUrl', e.target.value)}
                                        // required
                                        className="w-full"
                                    />
                                    <InputError message={errors.callBackUrl}/>
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