import { Head, useForm, usePage } from '@inertiajs/react';
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



export default function NewRateProfile({ onNewRateProfileAdded }) {
    
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
        deposit_fee: '',
        withdrawal_fee: '',
    })
    
    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/configuration/add_rate_profile', {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsLoading(false);
                reset();

                if (onNewRateProfileAdded) {
                    onNewRateProfileAdded();
                }

                // toast.success('You have successfully created a rate profile!', { duration: 3000 });
                toast.success('You have successfully created a rate profile!', {
                    title: 'You have successfully created a rate profile!',
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
        <div className='sm:w-full xl:w-auto lg:w-auto md:w-auto'>
            <Button 
                size='lg'
                iconOnly
                className='gap-2 justify-center items-center text-sm font-semibold w-full'
                onClick={openModal}
            >
                <AddIcon aria-hidden="true"/>
                New Rate Profile
            </Button>

            {/* <CustomToaster/> */}

            <Modal show={isOpen} onClose={closeModal} title="New Rate Profile" maxWidth='md'>
                <form onSubmit={submit}>
                    <div className='flex flex-col gap-12'>
                        <div className='flex flex-col gap-5'>
                            <div className="space-y-1.5">
                                <div className='flex items-center gap-1'>
                                    <Label for="name" value="Rate Profile Name"/> <span className='text-sm text-error-600 font-medium'>*</span>
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
                                    <Label for="deposit_fee" value="Deposit Fee"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                </div>
                                <Input 
                                    id="deposit_fee" 
                                    type='text'
                                    value={data.deposit_fee}
                                    handleChange={(e) => setData('deposit_fee', e.target.value)}
                                    // required
                                    className="w-full"
                                />
                                <InputError message={errors.deposit_fee}/>
                            </div>
                            <div className="space-y-1.5">
                                <div className='flex items-center gap-1'>
                                    <Label for="withdrawal_fee" value="Withdrawal Fee"/> <span className='text-sm text-error-600 font-medium'>*</span>
                                </div>
                                <Input 
                                    id="withdrawal_fee" 
                                    type='text'
                                    value={data.withdrawal_fee}
                                    handleChange={(e) => setData('withdrawal_fee', e.target.value)}
                                    // required
                                    className="w-full"
                                />
                                <InputError message={errors.withdrawal_fee}/>
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