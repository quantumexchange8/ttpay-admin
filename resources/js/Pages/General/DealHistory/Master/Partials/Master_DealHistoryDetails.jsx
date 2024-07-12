import React from 'react';
import Tooltip from '@/Components/Tooltip';
import { CopyIcon } from '@/Components/Icon/Icon';
import Input from '@/Components/Input';
import { formatDateTime } from '@/Composables/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Success, Pending, Freezing, Failed, Rejected} from '@/Components/Badge'

const ShowClients = ({ closeModal, transaction }) => {
    const { transaction_number, created_at, transaction_date, merchant, amount, fee, status, from_wallet, to_wallet, description } = transaction;

    // console.log('Merchant:', merchant);

    // const handleCopy = (text) => {
    //     navigator.clipboard.writeText(text).then(() => {
    //         alert('Copied to clipboard');
    //     }).catch((err) => {
    //         console.error('Failed to copy: ', err);
    //     });
    // };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard');
        }).catch((err) => {
            toast.error('Failed to copy');
            console.error('Failed to copy: ', err);
        });
    };
    

    return (
        <div className="flex flex-col gap-[20px]">
            <div className="relative flex flex-col text-neutral-500 gap-[12px]">
            <ToastContainer
            position='top-center'
            autoClose={300}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={false}
            theme='dark'/>
                <div className="flex gap-[12px] items-center">
                    <div className='flex w-[150px]'>
                        <div className="text-sm font-bold">TRANSACTION ID: </div>
                    </div>
                        <div className='text-[#FFF] text-base font-normal'>{transaction_number}</div>
                    
                </div>
                <div className="flex gap-[12px] items-center">
                    <div className='flex w-[150px]'>
                        <div className="text-sm font-bold">REQUESTED DATE: </div>
                    </div>
                    <div className='text-[#FFF] text-base font-normal'>{formatDateTime(created_at)}</div>
                </div>
                <div className="flex gap-[12px] items-center">
                    <div className='flex w-[150px]'>
                        <div className="text-sm font-bold">APPROVAL DATE: </div>
                    </div>
                    <div className='text-[#FFF] text-base font-normal'>{formatDateTime(transaction_date)}</div>
                </div>
                <div className="flex gap-[12px] items-center">
                    <div className='flex w-[150px]'>
                        <div className="text-sm font-bold">MERCHANT: </div>
                    </div>
                    <div className='text-[#FFF] text-base font-normal'>{merchant?.name}</div>
                </div>
                <div className="flex gap-[12px] items-center">
                    <div className='flex w-[150px]'>
                        <div className="text-sm font-bold">AMOUNT: </div>
                    </div>
                    <div className='text-[#FFF] text-base font-normal'>$ {amount}</div>
                </div>
                <div className="flex gap-[12px] items-center">
                    <div className='flex w-[150px]'>
                        <div className="text-sm font-bold">FEE: </div>
                    </div>
                    <div className='text-[#FFF] text-base font-normal'>$ {fee}</div>
                </div>
                <div className="flex gap-[12px] items-center">
                    <div className='flex w-[150px]'>
                        <div className="text-sm font-bold">STATUS: </div>
                    </div>
                    
                    <div className='rounded-full w-[60px] flex items-center'>
                        {status.toLowerCase() === 'success' && <Success />}
                        {status.toLowerCase() === 'pending' && <Pending />}
                        {status.toLowerCase() === 'freezing' && <Freezing />}
                        {status.toLowerCase() === 'rejected' && <Rejected />}
                        {status.toLowerCase() === 'failed' && <Failed />}
                    </div>
                </div>
            </div>

            <div className='flex flex-col border-t-[1px] border-solid border-neutral-700 gap-[8px]'>
                <div className='flex flex-col gap-[4px] pt-[12px]'>
                    <div className='text-sm text-neutral-500 font-bold'>
                        FROM
                    </div>
                    <div className='flex text-base font-normal text-white items-center gap-2'>
                        <div className='truncate w-[300px]'>{from_wallet}</div>
                        <div onClick={() => handleCopy(from_wallet)} className='cursor-pointer'>
                            <Tooltip text='copy'>
                                <CopyIcon />
                            </Tooltip>
                        </div>
                    </div>
                </div>
                
                <div className='flex flex-col gap-[4px]'>
                    <div className='text-sm text-neutral-500 font-bold'>
                        TO
                    </div>
                    <div className='flex text-base font-normal text-white items-center gap-2'>
                        <div className='truncate w-[300px]'>{to_wallet}</div>
                        <div onClick={() => handleCopy(to_wallet)} className='cursor-pointer'>
                            <Tooltip text='copy'>
                                <CopyIcon />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col border-t-[1px] border-solid border-neutral-700 gap-[8px]'>
                <div className='flex flex-col gap-[4px] pt-[12px]'>
                    <div className='text-sm text-neutral-500 font-bold'>
                        DESCRIPTION
                    </div>
                    <div className='text-base text-white font-normal leading-normal'>
                        {description}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ShowClients;
