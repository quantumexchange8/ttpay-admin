import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, } from '@inertiajs/react';
import { Alert, ArrowRight, Delete, PlusIcon } from '@/Components/Icon/Icon';
import { Fragment, useEffect, useRef, useState } from 'react';
import Button from '@/Components/Button';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import Dropdown from '@/Components/Dropdown';
import { Menu, Switch, Transition } from '@headlessui/react'
import Checkbox from '@/Components/Checkbox';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { RadioButtonActive, RadioButton } from '@/Components/RadioButton';
// import MerchantProfile from '@/Pages/Merchant/CreateMerchant/Partials/MerchantProfile'

const approvalMode = [
    {
      name: 'Manual Approval of Deposit',
      value: '0'
    },
    {
      name: 'Automatic Approval of Deposit',
      value: '1'
    },
  ]

export default function CreateMerchant({ auth, rateProfiles, trc20Addressess, phoneCodes }) {

    const [step, setStep] = useState(1);
    const [ isActive, setIsActive ] = useState()
    const [selectedPhoneCode, setSelectedPhoneCode] = useState('+60');
    const [selectedRateProfile, setSelectedRateProfile] = useState(null);
    const [selectedRefresh, setSelectedRefresh] = useState('20 seconds');

    const [selectedMode, setSelectedMode] = useState(approvalMode[0])
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [emailFields, setEmailFields] = useState([]);

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
    // const [errors, setErrors] = useState({});

    const onSelect = (phoneCode) => {
        setSelectedPhoneCode(phoneCode);
    };

    const options = phoneCodes.map(phoneCode => ({
        value: phoneCode.value,
        label: phoneCode.label,
        dialCode: phoneCode.dial_code
    }));

    const refreshOptions = [
        { label: '20 seconds', value: 20 },
        { label: '30 seconds', value: 30 },
        { label: '1 minute', value: 60 },
        { label: '3 minutes', value: 180 },
        { label: '5 minutes', value: 300 },
    ];
    
    const { data, setData, post, processing, reset } = useForm({
        //page 1
        merchant_name: '',
        manager_name: '',
        merchant_email: '',
        dial_code: selectedPhoneCode,
        phone_number: '',

        // page 2
        rate_profile: '',
        url: '',
        auto_refresh: '',
        wallet_address: [], //pass wallet_address id with array
        approval_mode: approvalMode[0].value,
        email_receiving: '',
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

    

    useEffect(() => {
        if (selectedRateProfile && data.rate_profile !== selectedRateProfile.id) {
            setData('rate_profile', selectedRateProfile.id);
        }
        if (selectedPhoneCode !== null && data.dial_code !== selectedPhoneCode) {
            setData('dial_code', selectedPhoneCode);
        }
        if (selectedRefresh !== null && data.auto_refresh !== selectedRefresh.value) {
            setData('auto_refresh', selectedRefresh.value);
        }
        if (selectedAddresses !== null && data.wallet_address !== selectedAddresses) {
            setData('wallet_address', selectedAddresses);
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

        //   setData('client_name', enabledClientName);

    }, [
        selectedRateProfile, 
        selectedPhoneCode,
        selectedRefresh,
        selectedAddresses,
        selectedMode,
        enabledClientName,
        data.rate_profile, 
        data.dial_code,
        data.auto_refresh,
        data.wallet_address,
        data.approval_mode,
        setData
    ]);

    const handleCheckboxChange = (address) => {
        setSelectedAddresses((prevSelected) => {
            if (prevSelected.includes(address)) {
                return prevSelected.filter((item) => item !== address);
            } else {
                return [...prevSelected, address];
            }
        });
    };

    const validatePage1 = () => {
        const newErrors = {};
        if (!data.merchant_name) newErrors.merchant_name = 'Merchant Name is required';
        if (!data.manager_name) newErrors.manager_name = 'Manager Name is required';
        if (!data.merchant_email) newErrors.merchant_email = 'Merchant Email is required';
        if (!data.phone_number) newErrors.phone_number = 'Merchant Phone Number is required';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePage2 = () => {

        const newErrors2 = {};
        if (!data.rate_profile) newErrors2.rate_profile = 'Please select Rate Profile';
        if (!data.url) newErrors2.url = 'Please field in the url';
        if (data.wallet_address.length === 0) newErrors2.wallet_address = 'Select at least 1 USDT address';
        
        setErrors(newErrors2);
        return Object.keys(newErrors2).length === 0;
    }
    

    const nextPage = () => {
        if (step === 1) {
            if (validatePage1()) {
                setStep(step + 1);
            }
        } else if (step === 2) {
            if (validatePage2()) {
                setStep(step + 1);
            }
        } else if (step < 3) {
            setStep(step + 1);
        }
    };
    

    const prevPage = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = () => {
        // Handle form submission
    };

    const submit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        post('/merchant/store-merchant', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);

                reset();
                toast.success('You have successfully created a new TRC-20 address!', { duration: 3000 });
                
            }, 
            onError: () => {
                setIsLoading(false);
            }

        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Create Merchant"
        >

            <Head title="Create Merchant" />
            <form onSubmit={submit} className='py-[60px]'>
                <div className='flex flex-col items-center gap-10'>
                    {/* PROGRESS BAR */}
                    <div className='max-w-[603px] flex items-center gap-5'>
                        <div className='flex items-center gap-2'>
                            <div className='w-9 h-9 flex items-center justify-center py-2 px-[10px] bg-primary-700 rounded-full'>
                                <span className='text-white text-sm font-semibold '>1</span>
                            </div>
                            <div className='text-base font-semibold text-white'>
                                Merchant Profile
                            </div>
                        </div>
                        <ArrowRight width={24} height={24} color='currentColor' className={step === 2 || step === 3 ? 'text-white' : 'text-gray-400'}/>
                        <div className='flex items-center gap-2'>
                            <div className={step === 2 || step === 3  ? 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-primary-700' : 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-gray-800'}>
                                <span className='text-white text-sm font-semibold '>2</span>
                            </div>
                            <div className={step === 2 || step === 3 ? 'text-base font-semibold text-white' : 'text-base font-semibold text-gray-500'}>Configuration</div>
                        </div>
                        <ArrowRight width={24} height={24} color='currentColor' className={step === 3 ? 'text-white' : 'text-gray-400'}/>
                        <div className='flex items-center gap-2'>
                            <div className={step === 3 ? 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-primary-700' : 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-gray-800'}>
                                <span className='text-white text-sm font-semibold '>3</span>
                            </div>
                            <div className={step === 3 ? 'text-base font-semibold text-white' : 'text-base font-semibold text-gray-500'}>Email Content</div>
                        </div>
                    </div>

                    {/* PAGE 1 */}
                    {step === 1 && (
                        // <MerchantProfile/>
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
                                            value={data.merchant_name}
                                            handleChange={e => setData('merchant_name', e.target.value)}
                                            hasError={!!errors.merchant_name}
                                        />
                                        {errors.merchant_name && <InputError message={errors.merchant_name} />}
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className='flex items-center gap-1'>
                                            <Label value='Manager Name'/> <span className='text-sm text-error-600 font-medium'>*</span>
                                        </div>
                                        <Input 
                                            className='w-full'
                                            type='text'
                                            value={data.manager_name}
                                            handleChange={e => setData('manager_name', e.target.value)}
                                            hasError={!!errors.manager_name}
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
                                            value={data.merchant_email}
                                            handleChange={e => setData('merchant_email', e.target.value)}
                                            hasError={!!errors.merchant_email}
                                        />
                                        {errors.merchant_email && <InputError message={errors.merchant_email} />}
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
                                                            className="inline-flex w-full justify-center items-center rounded-md bg-[#ffffff0d] hover:bg-[#ffffff1a] px-4 py-2 text-base font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
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
                                                                            type='button'
                                                                            className={`${
                                                                                active ? ' text-white' : 'text-white'
                                                                                } group flex w-full items-center rounded-md px-4 py-2 text-sm hover:bg-[#ffffff1a]`}
                                                                                onClick={() => {
                                                                                    onSelect(phoneCode.dialCode);
                                                                                }}
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
                                                value={data.phone_number}
                                                handleChange={e => setData('phone_number', e.target.value)}
                                                hasError={!!errors.phone_number}
                                            />
                                        </div>
                                        {errors.phone_number && <InputError message={errors.phone_number} />}
                                        {/* <InputError/> */}
                                    </div>
                                </div>
                                <div className='w-full p-10 flex justify-end border-t border-gray-800'>
                                {/* <Button variant='secondary' size='lg' onClick={handleSubmit} className="button" type="button">
                                    Cancel
                                </Button> */}
                                <Button size='lg' onClick={nextPage} className="button" type="button">
                                    Continue
                                </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* PAGE 2 */}
                    {step === 2 && (
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
                                        handleChange={e => setData('url', e.target.value)}
                                        hasError={!!errors.url}
                                        className='w-full'
                                        placeholder='https://'
                                    />
                                    {errors.url && <InputError message={errors.url} />}
                                    {/* <InputError/> */}
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
                                    {/* <InputError/> */}
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
                                        <div className='text-white text-sm font-medium'>
                                            Select approval mode
                                        </div>
                                        <div>
                                            <RadioGroup value={selectedMode} onChange={setSelectedMode}>
                                                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                                <div className="space-y-2 flex flex-col gap-3">
                                                    {approvalMode.map((plan) => (
                                                    <RadioGroup.Option
                                                        key={plan.name}
                                                        value={plan}
                                                        className={({ checked }) =>
                                                        `
                                                        ${checked ? 'text-white' : 'bg-transparent text-white'}
                                                            relative flex cursor-pointer rounded-lg focus:outline-none`
                                                        }
                                                    >
                                                        {({ active, checked }) => (
                                                        <>
                                                            <div className="flex w-full items-center justify-between">
                                                                <div className="flex items-center">
                                                                    <div className="text-base flex items-center gap-3">
                                                                        <div>
                                                                            {checked && (
                                                                                <div className="shrink-0 text-white">
                                                                                    <RadioButtonActive className="h-5 w-5" />
                                                                                </div>
                                                                            )}
                                                                            {!checked && (
                                                                                <div className="shrink-0 text-white">
                                                                                    <RadioButton className="h-5 w-5"/>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <RadioGroup.Label
                                                                            as="p"
                                                                            className={`font-medium  ${
                                                                            checked ? 'text-white' : 'text-white'
                                                                            }`}
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
                                    <div className='w-full flex flex-col gap-3'>
                                        <div className='space-y-1.5'>
                                            <div className='flex items-center gap-1'>
                                                <Label value='Email'/> <span className='text-sm text-error-600 font-medium'>*</span>
                                            </div>
                                            <Input
                                                type='email'
                                                className='w-full'
                                                value={data.email_receiving}
                                                handleChange={e => setData('email_receiving', e.target.value)}
                                                hasError={!!errors.email_receiving}
                                                placeholder='example@email.com'
                                            />
                                        </div>
                                        {emailFields.map((emailField, index) => (
                                            <div key={index} className='space-y-1.5'>
                                                <div className='flex items-center gap-1'>
                                                    {/* <Label value={`Email ${index + 1}`} /> */}
                                                    <Label value='Email'/>
                                                </div>
                                                <div className='flex items-center gap-3'>
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
                                <Button size='lg' onClick={nextPage} className="button" type="button">
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* PAGE 3 */}
                    {step === 3 && (
                        <div className='w-full flex flex-col items-center gap-10 bg-[#ffffff0d] rounded-xl'>
                            <div className='w-full py-5 px-10 flex flex-col gap-1 border-b border-gray-800'>
                                <div className='text-lg text-white font-bold'>
                                    Email Content
                                </div>
                                <div className='text-sm text-gray-300'>
                                    This email notifies the merchant about their transactions. Customise it to ensure a smooth experience for the merchant.
                                </div>
                            </div>

                            <div className='w-full px-10 flex flex-col gap-5'>
                                <div className='flex items-center gap-3'>
                                    <Switch
                                        checked={enabledClientName}
                                        onChange={setEnabledClientName}
                                        className={`${enabledClientName ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                        relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
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

                            <div className="w-full p-10 flex justify-between border-t border-gray-800">
                                <Button variant='secondary' size='lg' onClick={prevPage} className="button" type="button">
                                    Go Back
                                </Button>
                                <Button 
                                    size='lg'
                                    onClick={handleSubmit} 
                                    className="button" 
                                    type="submit">
                                        Confirm
                                </Button>
                            </div>
                        </div>
                    )}
                    
                </div>
            </form>
            

        </AuthenticatedLayout>
    )
}