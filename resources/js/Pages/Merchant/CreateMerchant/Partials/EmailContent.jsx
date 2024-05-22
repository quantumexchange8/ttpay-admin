import React from "react";
import { Menu, Switch, Transition } from '@headlessui/react'
import Button from '@/Components/Button';

export default function EmailContent({
    data,
    prevPage,
    setData,
    enabledClientName,
    setEnabledClientName,
    enabledClientEmail,
    setEnabledClientEmail,
    enabledClientId,
    setEnabledClientId,
    enabledDepositAmount,
    setEnabledDepositAmount,
    enabledDateTime,
    setEnabledDateTime,
    enabledClientUsdt,
    setEnabledClientUsdt,
    enabledClientUsdtReceive,
    setEnabledClientUsdtReceive,
    enabledTxid,
    setEnabledTxid,
    enabledPhoto,
    setEnabledPhoto,
    isLoading,
    }) {

    return (
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
                    className="button" 
                    type="submit"
                    disabled={isLoading}
                >
                        Confirm
                </Button>
            </div>
        </div>
    )
}