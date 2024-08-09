import React, { Fragment, useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import Action from '@/Pages/Merchant/MerchantListing/Partials/Action';
import SwitchStatus from '@/Pages/Merchant/MerchantListing/Partials/SwitchStatus';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import { CopyIcon, Delete, PlusIcon } from '@/Components/Icon/Icon';
import axios from 'axios';
import Tooltip from '@/Components/Tooltip';
import Input from '@/Components/Input';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default function MerchantListingTable({ searchVal, phoneCodes, rateProfiles, walletAddress }) {

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [walletFields, setWalletFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState();
    const [showListbox, setShowListbox] = useState(false);
    const [walletAddresses, setWalletAddresses] = useState([]);
    const [deletedIds, setDeletedIds] = useState([]);
    const [tooltipText, setTooltipText] = useState('copy');

    const fetchData = async () => {
        try {
            const response = await axios.get('/merchant/getMerchantListing');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    useEffect(() => {
        if (!isLoading) {
            // console.log('Data length:', data.length);
        }
    }, [isLoading, data]);

    // console.log(data)

    const openModal = (row) => {
        setSelectedRow(row);
        setWalletFields([]);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedRow(null);
        setDeletedIds([]);
    };

    const deleteWalletAddress = (walletID) => {
        
        setDeletedIds(prev => [...prev, walletID]);
        // try {
        //     const response = await axios.post('/merchant/deleteWalletAddress', { 
        //         id: selectedRow.id, 
        //         delete_id: walletID,

        //     });
        //     // console.log('Update response:', response.data);
        //     fetchData();
        //     closeModal();
        // } catch (error) {
        //     console.error('Error deleting wallet address:', error);
        // }

    }

    const updateWalletAddress = async () => {
        try {
            const response = await axios.post('/merchant/updateWalletAddress', { 
                id: selectedRow.id, 
                walletFields,
                deleted_id: deletedIds
            });
            // console.log('Update response:', response.data);
            fetchData();
        } catch (error) {
            console.error('Error updating wallet address:', error);
        }
        closeModal();
    };

    const addWalletField = () => {
        setWalletFields([...walletFields, { newWallet: '', selected: null }]);
    };

    const removeWalletField = (index) => {
        setWalletFields(walletFields.filter((_, i) => i !== index));
    };

    const handleWalletFieldChange = (index, value) => {
        const updatedFields = [...walletFields];
        updatedFields[index].newWallet = value;
        setWalletFields(updatedFields);
    };

    const handleSelectWallet = (index, wallet) => {
        const updatedFields = [...walletFields];
        updatedFields[index].newWallet = wallet.token_address;
        updatedFields[index].selected = wallet;
        setWalletFields(updatedFields);
    };

    const getFilteredWallets = (selectedAddresses) => {
        return walletAddress.filter(wallet => 
            !selectedAddresses.includes(wallet.token_address)
        );
    };

    const selectedAddresses = [
        ...(selectedRow?.merchant_wallet_address.map(address => address.wallet_address.token_address) || []),
        ...walletFields.map(field => field.newWallet)
    ];

    const columns = [
        {
            accessor: 'name',
            header: 'Merchant',
            sortable: false,
            Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    
                    <img className='object-cover w-6 h-6 rounded-full' src={row.profile_photo ? row.profile_photo : 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt="merchant_pic" />
                    
                    <div className="flex flex-col text-xs">
                        <div className='text-white'>{row.name}</div>
                        <div className='text-gray-300'>{row.role_id}</div>
                    </div>
                </div>
            ),
        },
        {
            accessor: 'merchant_wallet.deposit_balance',
            header: 'Deposit',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.merchant_wallet.total_deposit}
                </div>
            ),
        },
        {
            accessor: 'withdrawal',
            header: 'Withdrawal',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.merchant_wallet.total_withdrawal}
                </div>
            ),
        },
        {
            accessor: 'freezing',
            header: 'Freezing',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.merchant_wallet.freezing_amount}
                </div>
            ),
        },
        {
            accessor: 'fee_charges',
            header: 'Fee Charges',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.merchant_wallet.total_fee}
                </div>
            ),
        },
        {
            accessor: 'usdt_address',
            header: 'USDT Address',
            sortable: false,
            Cell: ({ row }) => (
                <button
                    type="button"
                    size="sm"
                    className='p-1 rounded-full bg-[#ffffff0d] hover:bg-[#ffffff1a] w-6 h-6 flex items-center'
                    onClick={() => openModal(row)}
                >
                    <span className='w-full text-xs font-semibold'>
                        {row.merchant_wallet_address.length}
                    </span>
                </button>
            ),
        },
    ];

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
        <div>
            <TanStackTable isLoading={isLoading} columns={columns} data={data} searchVal={searchVal}
            actions={[(row) => <Action key={row.id} merchant={row} fetchDataCallback={fetchData} phoneCodes={phoneCodes} rateProfiles={rateProfiles}/>]}
            statuses={[(row) => <SwitchStatus key={row.id} merchant={row} fetchDataCallback={fetchData}  />]}
            />

            <Modal show={isOpen} onClose={closeModal} title='View USDT Addresses' maxWidth='md' maxHeightClass='xl'>
                {selectedRow && (
                    <div className='flex flex-col gap-12'>
                        <div className='max-h-60 overflow-y-scroll'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th colSpan="2" className='text-left bg-[#ffffff0d] p-3 text-gray-500 text-xs font-bold'>USDT ADDRESS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedRow.merchant_wallet_address.map((address) => (
                                        <tr key={address.id} className={`border-b border-[#ffffff0d] p-3 ${deletedIds.includes(address.id) ? 'line-through decoration-white' : ''}`}>
                                            <td className='pl-3 py-3 text-white text-sm'>
                                                <div className='flex items-center gap-2'>
                                                    <div>{address.wallet_address.token_address}</div>
                                                    <div onClick={() => handleCopy(address.wallet_address.token_address)} className='cursor-pointer'>
                                                        <Tooltip text={tooltipText}>
                                                            <CopyIcon />
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='pr-3 py-3 w-20'>
                                                <div className='flex items-center justify-center'>
                                                    <Button variant='secondary' pill className='bg-transparent hover:bg-transparent' type='button' onClick={() => deleteWalletAddress(address.id)}>
                                                        <Delete width={16} height={16} color='currentColor' className='text-error-600'/>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {walletFields.map((field, index) => (
                                        <tr key={index}>
                                            <td colSpan="2">
                                                <div className="flex items-center gap-2">
                                                    <Listbox value={field.selected} onChange={(wallet) => handleSelectWallet(index, wallet)}>
                                                        <div className="relative mt-1 max-w-[340px] w-full">
                                                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-transparent py-2 px-3 text-left shadow-md focus:outline-none text-white text-sm">
                                                                <div className="block truncate">
                                                                    {
                                                                        field.selected ? (
                                                                            <div className='flex items-center gap-2'>
                                                                                {field.selected.token_address}
                                                                            </div>
                                                                            
                                                                        ) : (
                                                                            <span className='text-error-500'>
                                                                                Select wallet address
                                                                            </span>
                                                                        )
                                                                    }
                                                                </div>
                                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                </span>
                                                            </Listbox.Button>
                                                            <Transition
                                                                as={Fragment}
                                                                leave="transition ease-in duration-100"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 backdrop-blur-3xl py-1 text-white text-sm shadow-lg focus:outline-none scrollbar-thin scrollbar-webkit">
                                                                    
                                                                    {getFilteredWallets(selectedAddresses).map((wallet, walletIdx) => (
                                                                        <Listbox.Option
                                                                            key={walletIdx}
                                                                            className={({ active }) =>
                                                                                `relative cursor-default select-none py-2 px-4 ${active ? 'bg-transparent text-primary-500' : 'text-white'}`
                                                                            }
                                                                            value={wallet}
                                                                        >
                                                                            {({ selected }) => (
                                                                                <>
                                                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                                        {wallet.name}: {wallet.token_address}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                        </span>
                                                                                    ) : null}
                                                                                </>
                                                                            )}
                                                                        </Listbox.Option>
                                                                    ))}
                                                                </Listbox.Options>
                                                            </Transition>
                                                        </div>
                                                    </Listbox>
                                                    <Button variant='secondary' pill className='bg-transparent hover:bg-transparent' type='button' onClick={() => removeWalletField(index)}>
                                                        <Delete width={16} height={16} color='currentColor' className='text-error-600'/>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="2">
                                            <div className='flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-white select-none cursor-pointer' onClick={addWalletField}>
                                                <PlusIcon color='currentColor'/>
                                                <span>Add Another</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <Button
                                variant='secondary'
                                size='lg'
                                className='w-full flex justify-center items-center'
                                type='button'
                                onClick={closeModal}
                            >
                                Cancel
                            </Button> 
                            <Button
                                variant='primary'
                                size='lg'
                                className='w-full flex justify-center items-center'
                                onClick={() => updateWalletAddress(selectedRow.id)}
                                type='button'
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}