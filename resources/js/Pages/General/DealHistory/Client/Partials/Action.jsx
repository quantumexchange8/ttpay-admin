import { Expired, Success } from '@/Components/Badge';
import Button from '@/Components/Button';
import { CopyIcon, ViewDetailsIcon } from '@/Components/Icon/Icon';
import Modal from '@/Components/Modal';
import Tooltip from '@/Components/Tooltip';
import { formatDateTime } from '@/Composables';
import React from 'react'
import { useState } from 'react';

function Action({ transaction }) {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [tooltipText, setTooltipText] = useState('copy');

    const handleView = () => {
        setActionType('view');
        setIsOpen(true);

    };

    const closeModal = () => {
        setIsOpen(false)
    }

    const handleCopy = (tokenAddress) => {
        const textToCopy = tokenAddress;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setTooltipText('Copied!');
            console.log('Copied to clipboard:', textToCopy);

            // Revert tooltip text back to 'copy' after 2 seconds
            setTimeout(() => {
                setTooltipText('copy');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };


  return (
    <div className="flex justify-center items-center gap-3">
        <Tooltip text="View details">
            <Button
                type="button"
                pill
                onClick={handleView}
                className="bg-transparent hover:bg-transparent"
            >
                <ViewDetailsIcon width={14} height={14} />
            </Button>
        </Tooltip>

        <Modal show={isOpen} onClose={closeModal} maxWidth='lg' title="View Client Deposit's Details">
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-3'>
                        <div className='w-[160px] text-gray-500 text-sm font-bold uppercase'>Transaction ID</div>
                        <div className='text-white text-base'>
                            {transaction.tt_txn}
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-[160px] text-gray-500 text-sm font-bold uppercase'>User Transaction ID</div>
                        <div className='text-white text-base'>
                            {transaction.transaction_number}
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-[160px] text-gray-500 text-sm font-bold uppercase'>Requested date</div>
                        <div className='text-white text-base'>
                            {formatDateTime(transaction.created_at)}
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-[160px] text-gray-500 text-sm font-bold uppercase'>Approval date</div>
                        <div className='text-white text-base'>
                            {transaction.transaction_date ? formatDateTime(transaction.transaction_date) : '-'}
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-[160px] text-gray-500 text-sm font-bold uppercase'>Merchant</div>
                        <div className='text-white text-base'>
                            {transaction.merchant.name} ({transaction.merchant.role_id})
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-[160px] text-gray-500 text-sm font-bold uppercase'>Amount</div>
                        <div className='text-white text-base'>
                            $ {transaction.txn_amount}
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-[160px] text-gray-500 text-sm font-bold uppercase'>Fee</div>
                        <div className='text-white text-base'>
                            $ {transaction.fee}
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-[160px] text-gray-500 text-sm font-bold uppercase'>Status</div>
                        <div className='text-white text-base'>
                            {transaction.status === 'success' ? <Success /> : <Expired />}
                        </div>
                    </div>
                </div>
                <div className=' border-t border-gray-700 flex flex-col gap-2'>
                    <div className='flex flex-col space-y-1 pt-3'>
                        <span className='text-sm text-gray-500 font-bold uppercase'>FROM</span>
                        <div className='text-white text-base leading-none flex items-center gap-2'>
                            {transaction.from_wallet ? transaction.from_wallet : '-'} 
                            {
                                transaction.from_wallet ? (
                                    <div onClick={() => handleCopy(transaction.from_wallet)}>
                                        <Tooltip text={tooltipText}>
                                            <CopyIcon />
                                        </Tooltip>
                                    </div>
                                ) : (
                                    null
                                )
                            }
                            
                        </div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-sm text-gray-500 font-bold uppercase'>TO</span>
                        <div className='text-white text-base leading-none flex items-center gap-2'>
                            {transaction.to_wallet}
                            <div onClick={() => handleCopy(transaction.to_wallet)}>
                                <Tooltip text={tooltipText}>
                                    <CopyIcon />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-sm text-gray-500 font-bold uppercase'>TxID</span>
                        <div className='flex gap-2 items-center'>
                            <div className=' text-white text-base leading-none overflow-hidden truncate'>
                                {transaction.txID ? transaction.txID : '-'}
                            </div>
                            {
                                transaction.txID != null ? (
                                    <div onClick={() => handleCopy(transaction.txID)}>
                                        <Tooltip text={tooltipText}>
                                            <CopyIcon />
                                        </Tooltip>
                                    </div>
                                ) : (
                                    null
                                )
                            }
                        </div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-sm text-gray-500 font-bold uppercase'>Origin Domain</span>
                        <div className='text-white text-base leading-none flex items-center gap-2'>
                            {transaction.origin_domain}
                        </div>
                    </div>
                </div>
                {
                    transaction.description != null ? (
                        <div className=' border-t border-gray-700 flex flex-col gap-2'>
                            <div className='flex flex-col space-y-1 pt-3'>
                                <span className='text-sm text-gray-500 font-bold uppercase'>DESCRIPTION</span>
                                <span className='text-white text-base leading-none'>
                                    {transaction.description}
                                </span>
                            </div>
                        </div>
                    ) : (
                        null
                    )
                }
                
            </div>
        </Modal>
    </div>
  )
}

export default Action