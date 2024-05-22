import React from "react";
import { Alert } from '@/Components/Icon/Icon';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Button from '@/Components/Button';
import { Menu, Switch, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function MerchantProfile({ data, phoneCodes, selectedPhoneCode, setSelectedPhoneCode, nextPage, setData }) {

    const [errors, setErrors] = useState({});

    const options = phoneCodes.map(phoneCode => ({
        value: phoneCode.value,
        label: phoneCode.label,
        dialCode: phoneCode.dial_code
    }));

    const onSelect = (phoneCode) => {
        setSelectedPhoneCode(phoneCode);
    };

    const handleInputChange = (field, value) => {
        setData(field, value);
        setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    };

    const handleSubmit = async () => {
        let tempErrors = {};

        if (!data.name) {
            tempErrors.name = 'Merchant Name is required';
        }

        if (!data.manager_name) {
            tempErrors.manager_name = 'Manager Name is required';
        }

        if (!data.email) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            tempErrors.email = 'Invalid Email';
        }

        if (!data.phone) {
            tempErrors.phone = 'Phone Number is required';
        }

        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {
            try {
                const response = await axios.post('/merchant/step1Validate-merchant', { email: data.email, name: data.name, phone: data.phone });
                if (response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    nextPage();
                }
            } catch (error) {
                console.error('Error checking email:', error);
                // Handle error appropriately
            }
        }
    }

    return (
        <div className='w-full flex flex-col gap-10'>
            <div className='p-5 flex items-center gap-3 bg-[#ffffff0d] rounded-xl'>
                <Alert/>
                <span className='text-gray-300 text-base font-medium'>
                    Please make sure the email provided is accurate. Login details will be sent via email upon addition of merchant.
                </span>
            </div>
            <div className='flex flex-col items-center gap-10 bg-[#ffffff0d] rounded-xl'>
                <div className='w-full py-5 px-10 flex flex-col gap-1 border-b border-gray-800'>
                    <div className='text-lg text-white font-bold'>
                        Merchant Profile
                    </div>
                    <div className='text-sm text-gray-300'>
                        Keeping this information accurate helps us provide better support and communication.
                    </div>
                </div>
                <div className='w-full px-10 grid grid-cols-2 gap-6'>
                    <div className="space-y-1.5">
                        <div className='flex items-center gap-1'>
                            <Label value='Merchant Name'/> <span className='text-sm text-error-600 font-medium'>*</span>
                        </div>
                        <Input 
                            className='w-full'
                            type='text'
                            value={data.name}
                            handleChange={e => handleInputChange('name', e.target.value)}
                            hasError={!!errors.name}
                            cursorColor="#5200FF"
                        />
                        {errors.name && <InputError message={errors.name} />}
                    </div>
                    <div className="space-y-1.5">
                        <div className='flex items-center gap-1'>
                            <Label value='Manager Name'/> <span className='text-sm text-error-600 font-medium'>*</span>
                        </div>
                        <Input 
                            className='w-full'
                            type='text'
                            value={data.manager_name}
                            handleChange={e => handleInputChange('manager_name', e.target.value)}
                            hasError={!!errors.manager_name}
                            cursorColor="#5200FF"
                        />
                        {errors.manager_name && <InputError message={errors.manager_name} />}
                    </div>
                    <div className="space-y-1.5">
                        <div className='flex items-center gap-1'>
                            <Label value='Merchant Email'/> <span className='text-sm text-error-600 font-medium'>*</span>
                        </div>
                        <Input 
                            className='w-full'
                            type='email'
                            value={data.email}
                            handleChange={e => handleInputChange('email', e.target.value)}
                            hasError={!!errors.email}
                            cursorColor="#5200FF"
                        />
                        {errors.email && <InputError message={errors.email} />}
                    </div>
                    <div className="space-y-1.5">
                        <div className='flex items-center gap-1'>
                            <Label value='Merchant Phone Number'/> <span className='text-sm text-error-600 font-medium'>*</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className="text-right">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button 
                                            type='button'
                                            className="inline-flex w-full justify-center items-center rounded-md bg-[#ffffff0d] hover:bg-[#ffffff1a] px-4 py-2 text-base font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
                                        >
                                            <span className='w-12 text-left'>
                                                {selectedPhoneCode}
                                            </span>
                                            <ChevronDownIcon
                                            className="h-4 w-4 text-violet-200 hover:text-violet-100"
                                            aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute w-full mt-1 origin-top-right py-2 rounded-md bg-[#ffffff0d] shadow-lg ring-1 ring-black/5 focus:outline-none backdrop-blur-[60px]">
                                            {options.map((phoneCode, index) => (
                                                <div key={index}>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                            className={`${
                                                                active ? ' text-white' : 'text-white'
                                                                } group flex w-full items-center rounded-md px-4 py-2 text-sm hover:bg-[#ffffff1a]`}
                                                                onClick={() => {
                                                                    onSelect(phoneCode.dialCode);
                                                                }}
                                                                type="button"
                                                            >
                                                                {phoneCode.dialCode}
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            ))}
                                            
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <Input 
                                className='w-full'
                                type='text'
                                value={data.phone}
                                handleChange={e => handleInputChange('phone', e.target.value)}
                                hasError={!!errors.phone}
                                cursorColor="#5200FF"
                            />
                        </div>
                        {errors.phone && <InputError message={errors.phone} />}
                        {/* <InputError/> */}
                    </div>
                </div>
                <div className='w-full p-10 flex justify-end border-t border-gray-800'>
                {/* <Button variant='secondary' size='lg' onClick={handleSubmit} className="button" type="button">
                    Cancel
                </Button> */}
                <Button size='lg' onClick={handleSubmit} className="button" type="button">
                    Continue
                </Button>
                </div>
            </div>
        </div>
    )
}