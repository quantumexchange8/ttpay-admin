import React from "react";
import TanStackTable from '@/Components/TanStackTable';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { Expired, Success, Pending } from "@/Components/Badge"
import Action from '@/Pages/General/DealHistory/Client/Partials/Action';
import { formatAmount } from "@/Composables";

export default function ClientTransactionTable({ searchVal, transactionType, filters, selectedMonthStart, selectedMonthEnd }) {
    
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (filters, selectedMonthStart, selectedMonthEnd) => {
        try {

            const params = {
                ...filters, 
                startDate: selectedMonthStart, 
                endDate: selectedMonthEnd 
            };

            const response = await axios.get('/deal-history/getMerchantClient', {
                params
            });
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(filters, selectedMonthStart, selectedMonthEnd); 
    }, [filters, selectedMonthStart, selectedMonthEnd]);

    useEffect(() => {
        if (!isLoading) {
            const filteredData = data.filter(item => item.transaction_type === transactionType);
            setFilteredData(filteredData);
            // You can use the filtered data for rendering or other purposes
        }
    }, [isLoading, data]);

    const columns = [
        {
            accessor: 'tt_txn',
            header: 'ID',
            sortable: false,
            className: 'hidden xl:block',
        },
        {
            accessor: 'transaction_date',
            header: 'Approval Date',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs max-w-[140px]'>
                    {row.transaction_date}
                </div>
            ),
        },
        {
            accessor: 'name',
            header: 'Merchant',
            sortable: false,
            Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    
                    <img className='object-cover w-6 h-6 rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                    
                    <div className="flex flex-col text-xs">
                        <div className='text-white'>{row.merchant.name}</div>
                        <div className='text-gray-300'>{row.merchant.role_id}</div>
                    </div>
                </div>
            ),
        },
        {
            accessor: 'client',
            header: 'Client',
            sortable: false,
            Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="flex flex-col text-xs">
                        <div className='text-white'>{row.client_name}</div>
                        <div className='text-gray-300'>{row.client_email}</div>
                    </div>
                </div>
            ),
        },
        {
            accessor: 'txn_amount',
            header: 'Amount',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.txn_amount ? formatAmount(row.txn_amount) : '0.00'}
                </div>
            ),
        },
        {
            accessor: 'fee',
            header: 'Fee',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.fee ? formatAmount(row.fee) : '0.00'}
                </div>
            ),
        },
        {
            accessor: 'status',
            header: 'Status',
            sortable: false,
            Cell: ({ row }) => (
                <div>
                    {row.status === 'success' ? <Success /> : row.status === 'pending' ? <Pending /> : <Expired />}
                </div>
            ),
        },
    ];

    return (
        <div>

            <TanStackTable 
                isLoading={isLoading} 
                searchVal={searchVal} 
                columns={columns} 
                data={filteredData}
                actions={[
                    (row) => <Action key={row.id} transaction={row} />
                ]}   
            />
        </div>
    )
}