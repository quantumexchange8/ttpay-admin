import React from "react";
import TanStackTable from '@/Components/TanStackTable';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { Rejected, Success, Freeze, Processing } from "@/Components/Badge"
import Action from '@/Pages/General/DealHistory/Merchant/Partials/Action';

export default function MerchantTransactionTable({ searchVal, filters, selectedMonthStart, selectedMonthEnd, exportCsv, setExportCsv }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [csvData, setCsvData] = useState([]);

    const fetchData = async (filters, selectedMonthStart, selectedMonthEnd, exportCsv) => {
        setIsLoading(true);
        try {

            const params = {
                ...filters, 
                startDate: selectedMonthStart, 
                endDate: selectedMonthEnd 
            };

            const response = await axios.get('/deal-history/getMasterMerchant', {
                params
            });
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const exportDataToCsv = async (filters, selectedMonthStart, selectedMonthEnd) => {
        setIsLoading(true);
        try {
            const params = {
                ...filters,
                startDate: selectedMonthStart,
                endDate: selectedMonthEnd,
                exportCsv: 'true'
            };

            const response = await axios.get('/deal-history/getMasterMerchant', {
                params,
                responseType: 'blob' // Important for file downloads
            });

            // Create a link to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Merchant-deal-history.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Error exporting data:', error);
        } finally {
            setIsLoading(false);
            setExportCsv(false); // Reset the exportCsv flag
        }
    };


    useEffect(() => {
        if (exportCsv) {
            exportDataToCsv(filters, selectedMonthStart, selectedMonthEnd);
        } else {
            fetchData(filters, selectedMonthStart, selectedMonthEnd);
        }
    }, [filters, selectedMonthStart, selectedMonthEnd, exportCsv]);

    useEffect(() => {
        if (!isLoading) {
            // console.log('Data length:', data.length);
        }
    }, [isLoading, data]);

    const columns = [
        {
            accessor: 'tt_txn',
            header: 'ID',
            sortable: false,
        },
        {
            accessor: 'transaction_date',
            header: 'Approval Date',
            sortable: true,
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
            accessor: 'total_amount',
            header: 'Amount',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.total_amount}
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
            header: 'Status',
            sortable: true,
            Cell: ({ row }) => (
                <div>
                    {row.status === 'success' ? <Success /> : row.status === 'rejected' ? <Rejected /> : row.status === 'freeze' ? <Freeze /> : <Processing />}
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
                data={data} 
                actions={[
                    (row) => <Action key={row.id} transaction={row} />
                ]}   
            />
        </div>
    )
}