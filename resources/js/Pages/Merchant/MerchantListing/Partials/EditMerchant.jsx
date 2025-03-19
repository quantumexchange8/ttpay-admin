import Button from "@/Components/Button";
import { ArrowRight, Delete, PlusIcon } from "@/Components/Icon/Icon";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { useForm } from "@inertiajs/react";
import React from "react";
import { Menu, Switch, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import { RadioGroup } from '@headlessui/react'
import { RadioButtonActive, RadioButton } from '@/Components/RadioButton';
import toast from "react-hot-toast";

const approvalMode = [
    {
      name: 'Manual Approval of Deposit',
      value: '0'
    },
    {
      name: 'Automatic Approval of Deposit',
      value: '1'
    },
    {
        name: 'TxID Approval of Deposit',
        value: '2'
    },
  ];

  const refreshOptions = [
    { label: '20 seconds', value: 20 },
    { label: '30 seconds', value: 30 },
    { label: '1 minute', value: 60 },
    { label: '3 minutes', value: 180 },
    { label: '5 minutes', value: 300 },
];

export default function EditMerchant({ closeModal, phoneCodes, rateProfiles, merchant }) {

    const mainEmail = merchant.merchant_email.find(email => email.main === 1);
    const optEmail = merchant.merchant_email.find(email => email.main === 0);
    
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedPhoneCode, setSelectedPhoneCode] = useState('+60');

    const [selectedMode, setSelectedMode] = useState(approvalMode[0])
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [emailFields, setEmailFields] = useState([]);
    const [selectedRateProfile, setSelectedRateProfile] = useState(null);
    const [selectedRefresh, setSelectedRefresh] = useState(refreshOptions[0]);

    const [enabledClientName, setEnabledClientName ] = useState(false)
    const [enabledClientEmail, setEnabledClientEmail ] = useState(false)
    const [enabledClientId, setEnabledClientId ] = useState(false)
    const [enabledDepositAmount, setEnabledDepositAmount ] = useState(false)
    const [enabledDateTime, setEnabledDateTime ] = useState(false)
    const [enabledClientUsdt, setEnabledClientUsdt ] = useState(false)
    const [enabledClientUsdtReceive, setEnabledClientUsdtReceive ] = useState(false)
    const [enabledTxid, setEnabledTxid ] = useState(false)
    const [enabledPhoto, setEnabledPhoto ] = useState(false)
    const [errors, setErrors] = useState({});

    const { data, setData, post, processing, reset } = useForm({
        //page 1
        id: merchant.id,
        name: merchant.name,
        manager_name: merchant.manager_name,
        email: merchant.email,
        dial_code: selectedPhoneCode,
        phone: merchant.phone,

        // page 2
        rate_profile: selectedRateProfile ? selectedRateProfile.id : '',
        url: merchant.url,
        auto_refresh: selectedRefresh.value,
        approval_mode: approvalMode[0].value,
        email_receiving: mainEmail.email,
        emailOptional: [],

        // page 3
        client_name: enabledClientName ? 1 : 0,
        client_email: enabledClientEmail ? 1 : 0,
        client_id: enabledClientId ? 1 : 0,
        deposit_amount: enabledDepositAmount ? 1 : 0,
        data_time: enabledDateTime ? 1 : 0,
        client_usdt_address: enabledClientUsdt ? 1 : 0,
        usdt_address_receiving: enabledClientUsdtReceive ? 1 : 0,
        show_txid: enabledTxid ? 1 : 0,
        photo_uploaded: enabledPhoto ? 1 : 0,
    })

    const options = phoneCodes.map(phoneCode => ({
        value: phoneCode.value,
        label: phoneCode.label,
        dialCode: phoneCode.dial_code
    }));

    useEffect(() => {
        if (merchant.dial_code) {
            setSelectedPhoneCode(merchant.dial_code);
        }
        if (merchant.rate_id) {
            const selectedProfile = rateProfiles.find(profile => profile.id === parseInt(merchant.rate_id));
            setSelectedRateProfile(selectedProfile);
        }

    }, [
        merchant,
        merchant.rate_id, 
        rateProfiles
    ]);

    const onSelectPhone = (phoneCode) => {
        setSelectedPhoneCode(phoneCode);
    };

    const onSelectRateProfile = (id) => {
        const selectedProfile = rateProfiles.find(profile => profile.id === id);
        setSelectedRateProfile(selectedProfile);
    };

    useEffect(() => {
        setEnabledClientName(merchant.merchant_email_content.client_name === '1');
        setEnabledClientEmail(merchant.merchant_email_content.client_email === '1');
        setEnabledClientId(merchant.merchant_email_content.client_id === '1');
        setEnabledDepositAmount(merchant.merchant_email_content.deposit_amount === '1');
        setEnabledDateTime(merchant.merchant_email_content.date_time === '1');
        setEnabledClientUsdt(merchant.merchant_email_content.client_usdt === '1');
        setEnabledClientUsdtReceive(merchant.merchant_email_content.usdt_receive === '1');
        setEnabledTxid(merchant.merchant_email_content.txid === '1');
        setEnabledPhoto(merchant.merchant_email_content.photo === '1');
    }, [merchant.merchant_email_content]);

    useEffect(() => {
        if (selectedRateProfile && data.rate_profile !== selectedRateProfile.id) {
            setData('rate_profile', selectedRateProfile.id);
        }
        if (data.approval_mode !== selectedMode.value) {
            setData('approval_mode', selectedMode.value);
        }
        if (data.client_name !== (enabledClientName ? 1 : 0)) {
            setData('client_name', enabledClientName ? 1 : 0);
        }
        if (data.client_email !== (enabledClientEmail ? 1 : 0)) {
            setData('client_email', enabledClientEmail ? 1 : 0);
        }
        if (data.client_id !== (enabledClientId ? 1 : 0)) {
            setData('client_id', enabledClientId ? 1 : 0);
        }
        if (data.deposit_amount !== (enabledDepositAmount ? 1 : 0)) {
            setData('deposit_amount', enabledDepositAmount ? 1 : 0);
        }
        if (data.data_time !== (enabledDateTime ? 1 : 0)) {
            setData('data_time', enabledDateTime ? 1 : 0);
        }
        if (data.client_usdt_address !== (enabledClientUsdt ? 1 : 0)) {
            setData('client_usdt_address', enabledClientUsdt ? 1 : 0);
        }
        if (data.usdt_address_receiving !== (enabledClientUsdtReceive ? 1 : 0)) {
            setData('usdt_address_receiving', enabledClientUsdtReceive ? 1 : 0);
        }
        if (data.show_txid !== (enabledTxid ? 1 : 0)) {
            setData('show_txid', enabledTxid ? 1 : 0);
        }
        if (data.photo_uploaded !== (enabledPhoto ? 1 : 0)) {
            setData('photo_uploaded', enabledPhoto ? 1 : 0);
        }
    }, [
        enabledClientName,
        enabledClientEmail,
        enabledClientId,
        enabledDepositAmount,
        enabledDateTime,
        enabledClientUsdt,
        enabledClientUsdtReceive,
        enabledTxid,
        enabledPhoto,
        selectedRateProfile,
        selectedMode,
        setData,
    ]);

    useEffect(() => {
        if (merchant.deposit_type === '0') {
            setSelectedMode(approvalMode[0]);
        } else if (merchant.deposit_type === '1') {
            setSelectedMode(approvalMode[1]);
        } else if (merchant.deposit_type === '2') {
            setSelectedMode(approvalMode[2]);
        }
      }, [merchant.deposit_type]);

      useEffect(() => {
        const refreshTime = parseInt(merchant.refresh_time);
        const selectedOption = refreshOptions.find(option => option.value === refreshTime);
        if (selectedOption) {
            setSelectedRefresh(selectedOption);
        }
    }, [merchant.refresh_time]);

    useEffect(() => {
        if (merchant.merchant_email) {
            setEmailFields(merchant.merchant_email.filter(email => email.main === 0).map(email => ({ emailOpt: email.email })));
        }
    }, [merchant.merchant_email]);

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

    const handleInputChange = (field, value) => {
        setData(field, value);
        setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    };

    const submit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        post('/merchant/updateMerchant', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                toast.success('New changes updated!', {
                    title: 'New changes updated!',
                    duration: 3000,
                    variant: 'variant3',
                });
                closeModal()
            },
            onError: () => {
                // closeModal(),
                setIsLoading(false);
                toast.error('Failed to update!', {
                    title: 'Failed to update!',
                    duration: 3000,
                    variant: 'variant3',
                })
            }
        })
    }

    return (
        <form onSubmit={submit}>
            <div className="flex flex-col items-center gap-5 md:gap-10">
                <div className='w-auto md:max-w-[603px] flex md:items-center md:gap-5'>
                    <div className='flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:cursor-pointer' onClick={() => setStep(1)}>
                        <div className='w-9 h-9 flex items-center justify-center py-2 px-[10px] bg-primary-700 rounded-full'>
                            <span className='text-white text-sm font-semibold '>1</span>
                        </div>
                        <div className='text-xs md:text-base font-semibold text-white text-center'>
                            Merchant Profile
                        </div>
                    </div>

                    <ArrowRight width={24} height={24} color='currentColor' className={step === 2 || step === 3 ? 'text-white' : 'text-gray-400'}/>

                    <div className='flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:cursor-pointer' onClick={() => setStep(2)}>
                        <div className={step === 2 || step === 3  ? 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-primary-700' : 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-gray-800'}>
                            <span className='text-white text-sm font-semibold '>2</span>
                        </div>
                        <div className={step === 2 || step === 3 ? 'text-xs md:text-base font-semibold text-white text-center' : 'text-xs text-center md:text-base font-semibold text-gray-500'}>Configuration</div>
                    </div>

                    <ArrowRight width={24} height={24} color='currentColor' className={step === 3 ? 'text-white' : 'text-gray-400'}/>
                    
                    <div className='flex flex-col md:flex-row items-center gap-1 md:gap-2 hover:cursor-pointer' onClick={() => setStep(3)}>
                        <div className={step === 3 ? 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-primary-700' : 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-gray-800'}>
                            <span className='text-white text-sm font-semibold '>3</span>
                        </div>
                        <div className={step === 3 ? 'text-xs md:text-base font-semibold text-white text-center' : 'text-xs text-center md:text-base font-semibold text-gray-500'}>Email Content</div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-12">

                    {
                        step === 1 && (
                            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-6">
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
                                                    <Menu.Items className="absolute z-50 w-full mt-1 py-2 rounded-md bg-[#202020a9] shadow-lg ring-1 ring-black/5 focus:outline-none backdrop-blur-[60px]">
                                                        {options.map((phoneCode, index) => (
                                                            <div key={index}>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                        className={`${
                                                                            active ? ' text-white' : 'text-white'
                                                                            } group flex w-full items-center rounded-md px-4 py-2 text-sm hover:bg-[#ffffff1a]`}
                                                                            onClick={() => {
                                                                                onSelectPhone(phoneCode.dialCode);
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
                        )
                    }

                    {
                        step === 2 && (
                            <div className="flex flex-col gap-10">
                                <div className='w-full px-3 md:px-10 flex flex-col md:grid md:grid-cols-2 gap-6'>
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
                                                                className={`group flex w-full items-center rounded-md px-4 py-2 text-sm text-white bg-gray-800 hover:bg-gray-900 ${rateProfile.id === (selectedRateProfile ? selectedRateProfile.id : '') ? 'bg-[#ffffff1a]' : ''}`}
                                                                onClick={() => onSelectRateProfile(rateProfile.id)}
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
                                    {/* <div className="space-y-1.5 col-span-2">
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
                                                            className={`group flex w-full items-center rounded-md px-4 py-2 text-sm text-white bg-gray-800 hover:bg-gray-900 ${active ? 'bg-[#ffffff1a]' : ''} ${selectedRefresh.value === option.value ? 'bg-[#ffffff1a]' : ''}`}
                                                            onClick={() => {
                                                                setSelectedRefresh(option);
                                                                setData('auto_refresh', option.value); // Update form data on selection
                                                            }} 
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                            hasError={!!errors.auto_refresh}
                                        />
                                        <span className="text-gray-500 text-xs">
                                            Selected USDT addresses will be auto-refreshed randomly within this selected timeframe. 
                                        </span>
                                        <InputError/>
                                    </div> */}


                                </div>
                                
                                <div className='flex flex-col gap-6 px-3 md:px-10'>
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
                                    <div className='flex flex-col md:flex-row gap-3 md:gap-6'>
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
                            </div>
                        )
                    }

                    {
                        step === 3 && (
                            <div className='w-full px-3 md:px-10 flex flex-col gap-5'>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledClientName}
                                        onChange={setEnabledClientName}
                                        className={`${enabledClientName ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledClientName ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show client's name</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledClientEmail}
                                        onChange={setEnabledClientEmail}
                                        className={`${enabledClientEmail ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledClientEmail ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show client's Email</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledClientId}
                                        onChange={setEnabledClientId}
                                        className={`${enabledClientId ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledClientId ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show client's ID</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledDepositAmount}
                                        onChange={setEnabledDepositAmount}
                                        className={`${enabledDepositAmount ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledDepositAmount ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show deposit amount</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledDateTime}
                                        onChange={setEnabledDateTime}
                                        className={`${enabledDateTime ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledDateTime ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show Date Time</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledClientUsdt}
                                        onChange={setEnabledClientUsdt}
                                        className={`${enabledClientUsdt ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledClientUsdt ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show Client's USDT address</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledClientUsdtReceive}
                                        onChange={setEnabledClientUsdtReceive}
                                        className={`${enabledClientUsdtReceive ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledClientUsdtReceive ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show USDT address receiving</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledTxid}
                                        onChange={setEnabledTxid}
                                        className={`${enabledTxid ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledTxid ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show TxID</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledPhoto}
                                        onChange={setEnabledPhoto}
                                        className={`${enabledPhoto ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`${enabledPhoto ? 'translate-x-3' : 'translate-x-0'}
                                            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                        />
                                    </Switch>
                                    <span className="text-white text-sm font-medium">Show photo uploaded</span>
                                </div>
                            </div>
                        )
                    }
                    

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
                            'Save Changes'
                            )}
                        </Button>
                    </div>
                </div>

                
            </div>
            
        </form>
    )
}