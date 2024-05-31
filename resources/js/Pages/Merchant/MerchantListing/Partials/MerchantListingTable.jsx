import React, { useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import Action from '@/Pages/Merchant/MerchantListing/Partials/Action';
import SwitchStatus from '@/Pages/Merchant/MerchantListing/Partials/SwitchStatus';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import { CopyIcon, Delete, PlusIcon } from '@/Components/Icon/Icon';
import axios from 'axios';
import Tooltip from '@/Components/Tooltip';
import Input from '@/Components/Input';

export default function MerchantListingTable({ searchVal, phoneCodes, rateProfiles }) {

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [walletFields, setWalletFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const updateWalletAddress = async () => {
        try {
            const response = await axios.post('/merchant/updateWalletAddress', { 
                id: selectedRow.id, 
                walletFields,
            });
            // console.log('Update response:', response.data);
            fetchData();
        } catch (error) {
            console.error('Error updating wallet address:', error);
        }
        closeModal();
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

            <Modal show={isOpen} onClose={closeModal} title='View USDT Addresses' maxWidth='md'>
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
                                            <Input 
                                                type='text' 
                                                className='w-full bg-transparent border border-gray-700 rounded px-2 py-1 text-white'
                                                isFocused={true}
                                                value={field.newWallet}
                                                handleChange={(e) => handleWalletFieldChange(index, e.target.value)}
                                            />
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