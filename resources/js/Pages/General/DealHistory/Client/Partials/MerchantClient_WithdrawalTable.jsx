import React, { useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import ViewDetails from '@/Pages/General/DealHistory/Client/Partials/View_Details';
import axios from 'axios';
import Tooltip from '@/Components/Tooltip';
import Input from '@/Components/Input';

export default function MerchantClient_WithdrawalTable ({searchVal, selectedMonth, appliedFilters}) {
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    // const [walletFields, setWalletFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/dealHistory/getClientWithdrawal');
            
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

    console.log(data)

    const openModal = (row) => {
        setSelectedRow(row);
        // setWalletFields([]);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedRow(null);
    };

    const filteredData = data.filter((row) => {
        // Filter by status
        if (appliedFilters.success && appliedFilters.rejected) { // Accept both selection simultaneously
            if (row.status !== 'Success' && row.status !== 'success' && row.status !== 'Rejected' && row.status !== 'rejected') {
                return false;
            }
        } else {
            if (appliedFilters.success && (row.status !== 'Success' && row.status !== 'success')) return false;
            if (appliedFilters.rejected && (row.status !== 'Rejected' && row.status !== 'rejected')) return false;
        }

        // Filter by amount
        if (appliedFilters.minAmount && row.amount < parseFloat(appliedFilters.minAmount)) return false;
        if (appliedFilters.maxAmount && row.amount > parseFloat(appliedFilters.maxAmount)) return false;

        // Filter by fee
        if (appliedFilters.minFee && row.fee < parseFloat(appliedFilters.minFee)) return false;
        if (appliedFilters.maxFee && row.fee > parseFloat(appliedFilters.maxFee)) return false;

        // Filter by month
        if (selectedMonth === 'All') return true;
        const [year, month] = selectedMonth.split('/');
        return row.transaction_date && row.transaction_date.startsWith(`${year}-${month}`);
      });

        // Calculate totals
        const totalAmount = filteredData.reduce((sum, row) => sum + parseFloat(row.amount), 0);
        const totalFees = filteredData.reduce((sum, row) => sum + parseFloat(row.fee), 0);
    

    const columns = [
        {
            accessor: 'transaction_number',
            header: 'ID',
            sortable: false,
            Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {/* <img className='object-cover w-6 h-6 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="client_pic" /> */}
                    <div className="flex flex-col text-xs">
                        <div className='text-white'>{ row.transaction_number }</div>
                    </div>
                </div>
            ),
        },
        {
            accessor: 'transaction_date',
            header: 'APPROVAL DATE',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    {row.transaction_date}
                </div>
            ),
        },
        {
            accessor: 'merchant_id',
            header: 'MERCHANT',
            sortable: false,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    {row.merchant_id}
                </div>
            ),
        },
        {
            accessor: 'client_id',
            header: 'CLIENT',
            sortable: false,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    {row.client_id}
                </div>
            ),
        },
        {
            accessor: 'amount',
            header: 'Amount',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.amount}
                </div>
            ),
        },
        {
            accessor: 'fee',
            header: 'Fee',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.fee}
                </div>
            ),
        },
        {
            accessor: 'status',
            header: 'STATUS',
            sortable: false,
            Cell: ({ row }) => (
                <div className='rounded-full w-[60px] flex items-center'>
                    <div
                        style={{
                            backgroundColor: row.status === 'Success' || row.status === 'success' ? 'rgba(22, 163, 74, 0.10)' : 
                                             row.status === 'Processing' || row.status === 'pending' || row.status === 'Pending' ? 'rgba(245, 158, 11, 0.10)' : 
                                             row.status === 'Rejected' || row.status === 'rejected' ? 'rgba(220, 38, 38, 0.10)' :
                                             row.status === 'Freezing' || row.status === 'freezing' ? 'rgba(47, 114, 255, 0.10)' : '',
                            color: row.status === 'Success' || row.status === 'success' ? '#22C55E' : 
                                   row.status === 'Processing' || row.status === 'pending' || row.status === 'Pending' ? '#F59E0B' : 
                                   row.status === 'Rejected' || row.status === 'rejected' ? '#EF4444' :
                                   row.status === 'Freezing' || row.status === 'freezing' ? '#2F72FF' : '',
                            borderColor: row.status === 'Success' || row.status === 'success' ? '#16A34A' : 
                                         row.status === 'Processing' || row.status === 'pending' || row.status === 'Pending' ? '#F59E0B' : 
                                         row.status === 'Rejected' || row.status === 'rejected' ? '#EF4444' :
                                         row.status === 'Freezing' || row.status === 'freezing' ? '#2F72FF' : '',
                        }}
                        className="w-[130px] text-xs font-medium rounded-[50px] py-[2px] px-3 border border-solid"
                    >
                        {row.status}
                    </div>
                </div>
            ),
        },
        {
            accessor: 'actions',
            header: '',
            sortable:false,
            Cell: ({ row }) => (
                <ViewDetails client_id={row} fetchDataCallback={fetchData}/>
            ),
        }
    ];

    return (
        <div className='flex flex-col overflow-x-auto overflow-y-auto'>
            {/* <div className='flex justify-center gap-[30px] p-4 text-white'>
                <div className='text-sm font-bold'>Total Amount: ${totalAmount.toFixed(2)}</div>
                <div className='text-sm font-bold'>Total Fees: ${totalFees.toFixed(2)}</div>
            </div> */}
            <TanStackTable isLoading={isLoading} columns={columns} data={filteredData} searchVal={searchVal}
            // statuses={[(row) => <SwitchStatus key={row.id} merchant={row} fetchDataCallback={fetchData}  />]}
            />
        </div>
    )
}