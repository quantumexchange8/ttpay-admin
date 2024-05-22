import React from "react";
import { Alert, Delete, PlusIcon } from '@/Components/Icon/Icon';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Button from '@/Components/Button';
import { Menu, Switch, Transition } from '@headlessui/react'
import Dropdown from '@/Components/Dropdown';
import Checkbox from '@/Components/Checkbox';
import { RadioGroup } from '@headlessui/react'
import { RadioButtonActive, RadioButton } from '@/Components/RadioButton';
import { useState } from 'react';

export default function Configuration({
    data,
    nextPage,
    prevPage,
    setData,
    selectedRateProfile,
    setSelectedRateProfile,
    rateProfiles,
    selectedRefresh,
    setSelectedRefresh,
    refreshOptions,
    trc20Addressess,
    selectedAddresses,
    setSelectedAddresses,
    selectedMode,
    setSelectedMode,
    approvalMode,
    emailFields,
    setEmailFields,
}) {

    const [errors, setErrors] = useState({});

    const addEmailField = () => {
        setEmailFields([...emailFields, { emailOpt: '' }]);
    };
    const removeEmailField = (index) => {
        const updatedEmailFields = emailFields.filter((_, i) => i !== index);
        setEmailFields(updatedEmailFields);
        const updatedEmailOptional = updatedEmailFields.map(field => field.emailOpt);
        setData('emailOptional', updatedEmailOptional);
    };

    const handleEmailChange = (index, event) => {
        const updatedEmailFields = emailFields.map((field, i) => 
            i === index ? { ...field, emailOpt: event.target.value } : field
        );
        setEmailFields(updatedEmailFields);
        const updatedEmailOptional = updatedEmailFields.map(field => field.emailOpt);
        setData('emailOptional', updatedEmailOptional);
    };
    
    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleCheckboxChange = (address) => {
        setSelectedAddresses((prevSelected) => {
            if (prevSelected.includes(address)) {
                return prevSelected.filter((item) => item !== address);
            } else {
                return [...prevSelected, address];
            }
        });
    };

    const handleInputChange = (field, value) => {
        setData(field, value);
        setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    };

    const handleSubmit = async () => {
        let tempErrors = {};
        let uniqueEmails = new Set();

        if (!data.rate_profile) {
            tempErrors.rate_profile = 'Please select a rate profile'
        }

        if (!data.url) {
            tempErrors.url = 'URL is required'
        }

        if (data.wallet_address.length === 0) {
            tempErrors.wallet_address = 'Select at least 1 USDT Address'
        }

        if (!data.email_receiving) {
            tempErrors.email_receiving = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email_receiving)) {
            tempErrors.email_receiving = 'Invalid Email';
        }

        emailFields.forEach((emailField, index) => {
            if (emailField.emailOpt) {
                // Check if email is already filled
                if (uniqueEmails.has(emailField.emailOpt)) {
                    tempErrors[`emailOpt_${index}`] = 'Duplicate email';
                } else if (!validateEmail(emailField.emailOpt)) {
                    tempErrors[`emailOpt_${index}`] = 'Invalid email format';
                }
                // Add email to uniqueEmails set
                uniqueEmails.add(emailField.emailOpt);
            }
        });

        setErrors(tempErrors);

        if (Object.keys(tempErrors).length === 0) {

            const filteredEmailFields = emailFields.filter(emailField => emailField.emailOpt);
            const emailOptional = filteredEmailFields.map(emailField => emailField.emailOpt);
            
            setData('emailOptional', emailOptional);
            try {
                const response = await axios.post('/merchant/step2Validate-merchant', { email_receiving: data.email_receiving, url: data.url });
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
        <div className='w-full flex flex-col items-center gap-10 bg-[#ffffff0d] rounded-xl'>
            <div className='w-full py-5 px-10 flex flex-col gap-1 border-b border-gray-800'>
                <div className='text-lg text-white font-bold'>
                    Configuration
                </div>
                <div className='text-sm text-gray-300'>
                    Define the rates they'll operate under and choose how deposit approvals should be handled to tailor their experience on the platform.
                </div>
            </div>

            <div className='w-full px-10 grid grid-cols-2 gap-6'>
                <div className="space-y-1.5">
                    <div className='flex items-center gap-1'>
                        <Label value='Rate Profile'/> <span className='text-sm text-error-600 font-medium'>*</span>
                    </div>
                    <Dropdown
                        defaultOptions={selectedRateProfile ? selectedRateProfile.name : <span className='text-gray-500 text-base'>Select</span>}
                        options={rateProfiles.map((rateProfile, index) => (
                            <div key={index}>
                            <Menu.Item>
                                {({ active }) => (
                                <button
                                    type="button"
                                    className={`group flex w-full items-center rounded-md px-4 py-2 text-sm text-white hover:bg-[#ffffff1a] ${rateProfile.id === (selectedRateProfile ? selectedRateProfile.id : null) ? 'bg-[#ffffff1a]' : ''}`}
                                    onClick={() => setSelectedRateProfile(rateProfile)}
                                >
                                    {rateProfile.name}
                                </button>
                                )}
                            </Menu.Item>
                            </div>
                        ))}
                        hasError={!!errors.rate_profile}
                    />
                    {errors.rate_profile && <InputError message={errors.rate_profile} />}
                </div>
                <div className="space-y-1.5">
                    <div className='flex items-center gap-1'>
                        <Label value='URL of the platform for receiving payments'/> <span className='text-sm text-error-600 font-medium'>*</span>
                    </div>
                    <Input 
                        type='text'
                        value={data.url}
                        handleChange={e => handleInputChange('url', e.target.value)}
                        hasError={!!errors.url}
                        className='w-full'
                        placeholder='https://'
                    />
                    {errors.url && <InputError message={errors.url} />}
                </div>
                <div className="space-y-1.5">
                    <div className='flex items-center gap-1'>
                        <Label value='Frequency of auto-refreshing USDT address'/> 
                    </div>
                    <Dropdown
                        defaultOptions={selectedRefresh ? selectedRefresh.label : ''}
                        options={refreshOptions.map((option) => (
                            <Menu.Item key={option.value}>
                                {({ active }) => (
                                    <button
                                        type='button'
                                        className={`group flex w-full items-center rounded-md px-4 py-2 text-sm text-white hover:bg-[#ffffff1a] ${active ? 'bg-[#ffffff1a]' : ''} ${selectedRefresh === option.value ? 'bg-[#ffffff1a]' : ''}`}
                                        onClick={() => setSelectedRefresh(option)} 
                                        value={option.value}
                                    >
                                        {option.label}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    />
                    <InputError/>
                </div>
                <div className="space-y-1.5">
                    <div className='flex items-center gap-1'>
                        <Label value='Select USDT address (multiple choices)'/> 
                    </div>
                    <div className='flex flex-col gap-2'>
                        {trc20Addressess.map((address, index) => (
                            <div key={index} className='flex items-center gap-3'>
                                <Checkbox
                                    key={index}
                                    id={`checkbox_${index}`}
                                    name={`trc20_address_${index}`}
                                    value={address}
                                    label={address} 
                                    className="mr-2 w-5 h-5"
                                    checked={selectedAddresses.includes(address.id)}
                                    onChange={() => handleCheckboxChange(address.id)}
                                />

                                <div className='flex flex-col'>
                                    <span className='text-xs font-medium text-white'>
                                        {address.name}
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                        {address.token_address}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {errors.wallet_address && <InputError message={errors.wallet_address} />}
                </div>
            </div>

            <div className='h-[1px] w-full bg-gray-800'></div>

            <div className='flex flex-col gap-6 px-10'>
                <div className='flex flex-col gap-1'>
                    <div className='text-white text-base font-bold'>
                        Deposit Approval Settings
                    </div>
                    <div className='flex flex-col clear-start text-sm text-gray-400'>
                        <div>
                            By selecting <span className='text-secondary-500'>“Automatic Approval”</span>, clients' deposits will be automatically approved by the system. However, choosing <span className='text-secondary-500'>“Manual Approval”</span> will require approval from the merchant for each deposit transaction.
                        </div>
                        <div>
                            In both modes, the system will send an email notification to the provided email addresses to notify the merchant about the transactions.
                        </div>
                    </div>
                </div>
                <div className='flex gap-6'>
                    <div className='w-full flex flex-col gap-2'>
                        <div className="w-full flex flex-col gap-2">
                            <div className="text-white text-sm font-medium">
                                Select approval mode
                            </div>
                            <div>
                                <RadioGroup value={selectedMode} onChange={setSelectedMode}>
                                    <RadioGroup.Label className="sr-only">Approval Mode</RadioGroup.Label>
                                    <div className="space-y-2 flex flex-col gap-3">
                                        {approvalMode.map((plan) => (
                                            <RadioGroup.Option
                                                key={plan.name}
                                                value={plan}
                                                className={({ checked }) =>
                                                    `${checked ? 'text-white' : 'bg-transparent text-white'} relative flex cursor-pointer rounded-lg focus:outline-none`
                                                }
                                            >
                                                {({ checked }) => (
                                                    <>
                                                        <div className="flex w-full items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="text-base flex items-center gap-3">
                                                                    <div>
                                                                        {checked ? (
                                                                            <div className="shrink-0 text-white">
                                                                                <RadioButtonActive className="h-5 w-5" />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="shrink-0 text-white">
                                                                                <RadioButton className="h-5 w-5" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <RadioGroup.Label
                                                                        as="p"
                                                                        className={`font-medium ${checked ? 'text-white' : 'text-white'}`}
                                                                    >
                                                                        {plan.name}
                                                                    </RadioGroup.Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-3'>
                        <div className='space-y-1.5'>
                            <div className='flex items-center gap-1'>
                                <Label value='Email'/> <span className='text-sm text-error-600 font-medium'>*</span>
                            </div>
                            <Input
                                type='email'
                                className='w-full'
                                value={data.email_receiving}
                                handleChange={e => handleInputChange('email_receiving', e.target.value)}
                                hasError={!!errors.email_receiving}
                                placeholder='example@email.com'
                            />
                            {errors.email_receiving && <InputError message={errors.email_receiving} />}
                        </div>
                        {emailFields.map((emailField, index) => (
                            <div key={index} className='space-y-1.5'>
                                <div className='flex items-center gap-1'>
                                    <Label value='Email (Optional)'/>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <div className="w-full flex items-center gap-2">
                                        <Input
                                            type='email'
                                            className='w-full'
                                            value={emailField.emailOpt}
                                            handleChange={(e) => handleEmailChange(index, e)}
                                            placeholder='example@email.com'
                                        />
                                        <div className='flex items-center justify-center bg-transparent rounded-full cursor-pointer w-6 h-6'>
                                            <div
                                                className='flex items-center justify-center bg-transparent rounded-full cursor-pointer w-6 h-6'
                                                onClick={() => removeEmailField(index)}
                                            >
                                                <Delete width={20} height={20} color="currentColor" className='text-error-600'/>
                                            </div>
                                        </div>
                                    </div>
                                    {errors[`emailOpt_${index}`] && <InputError message={errors[`emailOpt_${index}`]} />}
                                </div>
                            </div>
                        ))}
                        <div className='flex items-center gap-2 text-gray-500 hover:text-white select-none cursor-pointer' onClick={addEmailField}>
                                <PlusIcon color='currentColor'/>
                                <span>Add Another</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full p-10 flex justify-between border-t border-gray-800">
                <Button variant='secondary' size='lg' onClick={prevPage} className="button" type="button">
                    Go Back
                </Button>
                <Button size='lg' onClick={handleSubmit} className="button" type="button">
                    Continue
                </Button>
            </div>
        </div>
    )
}