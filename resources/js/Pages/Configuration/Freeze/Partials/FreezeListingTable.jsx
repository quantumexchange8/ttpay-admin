import TanStackTable from "@/Components/TanStackTable";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Action from '@/Pages/Configuration/Freeze/Partials/Action'

export default function FreezeListingTable({ searchVal, selectedDate }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/configuration/getFreezeTransaction');
            
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

    const columns = [
        {
            accessor: 'tt_txn',
            header: 'ID',
            sortable: false,
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
            accessor: 'created_at',
            header: 'DateTime',
            sortable: true,
        },
        {
            accessor: 'amount',
            header: 'Freezing Amount',
            sortable: true,
        },
        
    ];

    return (
        <div>
            <TanStackTable 
                isLoading={isLoading} 
                columns={columns} 
                data={data}
                searchVal={searchVal}
                selectedDate={selectedDate}
                actions={[(row) => <Action key={row.id} transaction={row} fetchDataCallback={fetchData}/>]}
            />
        </div>
    )
}