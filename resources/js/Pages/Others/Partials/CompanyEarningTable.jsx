import TanStackTable from "@/Components/TanStackTable";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function CompanyEarningTable({ searchVal, selectedMonthStart, selectedMonthEnd, exportCsv, setExportCsv }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (selectedMonthStart, selectedMonthEnd) => {
        try {

            const params = {
                startDate: selectedMonthStart, 
                endDate: selectedMonthEnd 
            };

            const response = await axios.get('/getCompanyEarning', {
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
        fetchData(selectedMonthStart, selectedMonthEnd); 
    }, [selectedMonthStart, selectedMonthEnd]);

    useEffect(() => {
        if (!isLoading) {
            // console.log('Data length:', data.length);
        }
    }, [isLoading, data]);

    const columns = [
        {
            accessor: 'created_at',
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
            accessor: 'merchant_wallet.total_deposit',
            header: 'Total Deposit',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.merchant_wallet.total_deposit}
                </div>
            ),
        },
        {
            accessor: 'merchant_wallet.total_withdrawal',
            header: 'Total Withdrawal',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.merchant_wallet.total_withdrawal}
                </div>
            ),
        },
        {
            accessor: 'merchant_wallet.freezing_amount',
            header: 'Total Freezing',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.merchant_wallet.freezing_amount}
                </div>
            ),
        },
        {
            accessor: 'merchant_wallet.total_fee',
            header: 'Total Fee Earning',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    $ {row.merchant_wallet.total_fee}
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
            />
        </div>
    )
}