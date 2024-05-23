import React, { useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import Action from '@/Pages/Merchant/MerchantListing/Partials/Action';
import SwitchStatus from '@/Pages/Merchant/MerchantListing/Partials/SwitchStatus';
import Button from '@/Components/Button';
import Modal from '@/Components/Modal';
import { Delete, PlusIcon } from '@/Components/Icon/Icon';
import axios from 'axios';

export default function MerchantListingTable({}) {

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const [walletFields, setWalletFields] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/merchant/getMerchantListing');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    console.log(data)

    const openModal = (row) => {
        setSelectedRow(row);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedRow(null);
    };

    const deleteWalletAddress = (walletID) => {
        console.log('wallet id: ', walletID)
    }

    const updateWalletAddress = (address) => {
        console.log(address)
        // try {
        //     const response = await axios.post('/merchant/updateWalletAddress', { id: walletAddressId });
        //     console.log('Delete response:', response.data);
            
        //     fetchData();
        // } catch (error) {
        //     console.error('Error deleting wallet address:', error);
        // }
    }

    const addWalletField = () => {
        setWalletFields([...walletFields, { newWallet: '' }]);
    }


    const columns = [
        {
            accessor: 'name',
            header: 'Merchant',
            sortable: false,
            Cell: ({ row }) => (
                <div className="flex flex-col">
                    <div>{row.name}</div>
                    <div>{row.role_id}</div>
                </div>
            ),
        },
        {
            accessor: 'merchant_wallet.deposit_balance',
            header: 'Deposit',
            sortable: true,
            Cell: ({ row }) => `$ ${row.merchant_wallet.deposit_balance}`,
        },
        {
            accessor: 'withdrawal',
            header: 'Withdrawal',
            sortable: true,
            Cell: ({ row }) => `$ ${row.merchant_wallet.deposit_balance}`,
        },
        {
            accessor: 'freezing',
            header: 'Freezing',
            sortable: true,
            Cell: ({ row }) => `$ ${row.merchant_wallet.deposit_balance}`,
        },
        {
            accessor: 'fee_charges',
            header: 'Fee Charges',
            sortable: true,
            Cell: ({ row }) => `$ ${row.merchant_wallet.deposit_balance}`,
        },
        {
            accessor: 'usdt_address',
            header: 'USDT Address',
            sortable: false,
            Cell: ({ row }) => (
                <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    pill
                    className='p-1'
                    onClick={() => openModal(row)}
                >
                    <span className='w-full'>
                        {row.merchant_wallet_address.length}
                    </span>
                </Button>
            ),
        },
    ];

    return (
        <div>
            <TanStackTable columns={columns} data={data} 
            actions={[(row) => <Action fetchDataCallback={fetchData} />]}
            statuses={[(row) => <SwitchStatus merchant={row} fetchDataCallback={fetchData}  />]}
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
                                            {address.wallet_address.token_address}
                                        </td>
                                        <td className='pr-3 py-3 w-20 flex justify-center'>
                                            <Button variant='secondary' pill className='bg-transparent hover:bg-transparent' type='button' onClick={() => deleteWalletAddress(address.id)}>
                                                <Delete width={16} height={16} color='currentColor' className='text-error-600'/>
                                            </Button>
                                            
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
                                onClick={() => updateWalletAddress(address)}
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