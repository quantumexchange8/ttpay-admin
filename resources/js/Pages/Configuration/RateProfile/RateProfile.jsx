import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputIconWrapper from '@/Components/InputIconWrapper';
import { Search, AddIcon } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Button from '@/Components/Button';
import RateProfileTable from '@/Pages/Configuration/RateProfile/Partials/RateProfileTable';
import Modal from "@/Components/Modal";
import React, { useState } from 'react';
import axios from 'axios';

export default function Dashboard({ auth }) {
    const [isOpen, modalDetails] = useState(false)

    const openModal = () => {
        modalDetails(true)
    }

    const closeModal = () => {
        modalDetails(false)

        // reset()
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const { data, setData, processing, errors, reset } = useForm({
        rate_profile_name: '',
        deposit_fee: '',
        withdrawal_fee: '',
    })

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const submit = (e) => {
        e.preventDefault();
    
        axios.post(route('configuration.add_rate_profile'), data)
            .then(response => {
                // Handle success, if needed
                console.log('Success:', response);
                closeModal(); // Close the modal after successful submission
            })
            .catch(error => {
                // Handle error, if needed
                console.error('Error:', error);
            });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Rate Profile"
        >
            <Head title="Rate Profile" />

            <div className='flex gap-5 flex-col'>
                <div className='w-full flex justify-between items-center'>
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
                            name="name"
                            placeholder="Name"
                            value={data.name}
                            className="block w-full"
                            autoComplete="name"
                            isFocused={false}
                            handleChange={onHandleChange}
                            required
                            cursorColor="#5200FF"
                            withIcon
                        />
                    </InputIconWrapper>
                    <Button 
                        size='lg'
                        iconOnly
                        className='gap-2 justify-center items-center'
                        onClick={openModal}
                    >
                        <AddIcon aria-hidden="true"/>
                        New Rate Profile
                    </Button>
                </div>

                <Modal show={isOpen} onClose={closeModal} title="New Rate Profile" maxWidth='md'>
                    <form>
                        <div className='flex flex-col gap-12'>
                            <div className='flex flex-col gap-5'>
                                <div className="space-y-1.5">
                                    <Label for="rate_profile_name" value="Rate Profile Name"/>
                                    <Input 
                                        id="rate_profile_name" 
                                        type='text' 
                                        value={data.rate_profile_name}
                                        handleChange={(e) => setData('rate_profile_name', e.target.value)}
                                        required
                                        isFocused
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label for="deposit_fee" value="Deposit Fee"/>
                                    <Input 
                                        id="deposit_fee" 
                                        type='text' 
                                        value={data.deposit_fee}
                                        handleChange={(e) => setData('deposit_fee', e.target.value)}
                                        required
                                        isFocused
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label for="withdrawal_fee" value="Withdrawal Fee"/>
                                    <Input 
                                        id="withdrawal_fee" 
                                        type='text' 
                                        value={data.withdrawal_fee}
                                        handleChange={(e) => setData('withdrawal_fee', e.target.value)}
                                        required
                                        isFocused
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center gap-3'>
                                <Button
                                    variant='secondary'
                                    size='lg'
                                    className='w-full flex justify-center'
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type='submit'
                                    size='lg'
                                    className='w-full flex justify-center'
                                    onClick={submit}
                                    processing={processing}
                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    </form>
                    
                </Modal>

                <div>
                    <RateProfileTable/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
