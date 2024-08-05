import TanStackTable from "@/Components/TanStackTable";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Action from "@/Pages/Merchant/MerchantBin/Partials/Action"
import { formatDate } from '@/Composables/index';

export default function MerchantBin({ searchVal, selectedDate }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {

            const response = await axios.get('/merchant/getMerchantBin');
            
            setData(response.data);

        } catch(error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }

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
            accessor: 'email',
            header: 'Email',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    {row.email}
                </div>
            ),
        },
        {
            accessor: 'bin',
            header: 'Deleted Date',
            sortable: true,
            Cell: ({ row }) => (
                <div className='text-xs'>
                    {formatDate(row.bin)}
                </div>
            ),
        },
        {
            accessor: 'handle_by',
            header: 'Deleted By',
            sortable: true,
            Cell: ({ row }) => (
                <div className="flex items-center gap-2 text-xs">
                    
                    <img className='object-cover w-6 h-6 rounded-full' src={row.user.profile_photo ? row.user.profile_photo : 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt="merchant_pic" />
                    
                    <div className="flex flex-col text-xs">
                        <div className='text-white'>{row.user.name}</div>
                        <div className='text-gray-300'>{row.user.role_id}</div>
                    </div>
                </div>
            ),
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
                actions={[(row) => <Action key={row.id} merchant={row} fetchDataCallback={fetchData} />]}
            />
        </div>
    )
}