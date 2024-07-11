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
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useForm } from '@inertiajs/inertia-react';

export default function MerchantListingTable({ searchVal, phoneCodes, rateProfiles, walletAddress }) {

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [walletFields, setWalletFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState(walletAddress[0]);
    const [query, setQuery] = useState('');

    const filteredPeople =
        query === ''
            ? walletAddress
            : walletAddress.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

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
    };

    const deleteWalletAddress = (walletID) => {
        // console.log('wallet id: ', walletID)
    }

    // const { post } = useForm({
    //     id: selectedRow.id,
    //     walletFields,
    // });

    const updateWalletAddress = async () => {
        // post('/merchant/updateWalletAddress', {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         closeModal();
        //         setIsLoading(false);
        //     }
        // })
        try {
            const response = await axios.post('/merchant/updateWalletAddress', { 
                id: selectedRow.id, 
                walletFields,
            });
            console.log('Update response:', response.data);
            fetchData();
        } catch (error) {
            console.error('Error updating wallet address:', error);
        }
        
    };

    const addWalletField = () => {
        setWalletFields([...walletFields, { newWallet: '' }]);
    };

    const removeWalletField = (index) => {
        setWalletFields(walletFields.filter((_, i) => i !== index));
    };

    const handleWalletFieldChange = (index, value) => {
        const updatedFields = [...walletFields];
        updatedFields[index].newWallet = value;
        setWalletFields(updatedFields);
    };

    const columns = [
        {
            accessor: 'name',
            header: 'Merchant',
            sortable: false,
            Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    
                    <img className='object-cover w-6 h-6 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                    
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
        // console.log(tokenAddress)
        const textToCopy = tokenAddress;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Copied to clipboard:', textToCopy);
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
                        <table className='w-full'>
                            <thead>
                                <tr>
                                    <th colSpan="2" className='text-left bg-[#ffffff0d] p-3 text-gray-500 text-xs font-bold'>USDT ADDRESS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedRow.merchant_wallet_address.map((address) => (
                                    <tr key={address.id} className='border-b border-[#ffffff0d] p-3'>
                                        <td className='pl-3 py-3 text-white text-sm'>
                                            <div className='flex items-center gap-2'>
                                                <div>{address.wallet_address.token_address}</div>
                                                <div onClick={() => handleCopy(address.wallet_address.token_address)} className='cursor-pointer'>
                                                    <Tooltip text='copy'>
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
                                    <tr key={index} className='border-b border-[#ffffff0d] p-3'>
                                        <td className='pl-3 py-3 text-white text-sm'>
                                            {/* <Input 
                                                type='text' 
                                                className='w-full bg-transparent border border-gray-700 rounded px-2 py-1 text-white'
                                                isFocused={true}
                                                value={field.newWallet}
                                                handleChange={(e) => handleWalletFieldChange(index, e.target.value)}
                                            /> */}
                                            <Combobox value={selected} onChange={setSelected}>
                                                <div className="relative mt-1">
                                                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-red-600 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                    <Combobox.Input
                                                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                        displayValue={(person) => person.name}
                                                        onChange={(event) => setQuery(event.target.value)}
                                                    />
                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <ChevronUpDownIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    </Combobox.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    afterLeave={() => setQuery('')}
                                                >
                                                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                    {filteredPeople.length === 0 && query !== '' ? (
                                                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                                        Nothing found.
                                                        </div>
                                                    ) : (
                                                        filteredPeople.map((person) => (
                                                        <Combobox.Option
                                                            key={person.id}
                                                            className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                            }`
                                                            }
                                                            value={person}
                                                        >
                                                            {({ selected, active }) => (
                                                            <>
                                                                <span
                                                                className={`block truncate ${
                                                                    selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                                >
                                                                {person.name}
                                                                </span>
                                                                {selected ? (
                                                                <span
                                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                    active ? 'text-white' : 'text-teal-600'
                                                                    }`}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                                ) : null}
                                                            </>
                                                            )}
                                                        </Combobox.Option>
                                                        ))
                                                    )}
                                                    </Combobox.Options>
                                                </Transition>
                                                </div>
                                            </Combobox>
                                        </td>
                                        <td className='pr-3 py-3 w-20'>
                                            <div className='flex items-center justify-center'>
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