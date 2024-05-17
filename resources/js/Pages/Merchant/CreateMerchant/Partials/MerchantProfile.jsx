import React from "react";
import { Alert } from '@/Components/Icon/Icon';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';

export default function MerchantProfile() {

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
    )
}