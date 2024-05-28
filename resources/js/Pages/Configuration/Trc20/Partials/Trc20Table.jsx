import React, { useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import axios from 'axios';
import Action from '@/Pages/Configuration/Trc20/Partials/Actions';
import formatDateTime from '@/Composables/index';

export default function Trc20Table({ searchVal }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/configuration/getTrc20Address');
            
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
            accessor: 'created_at',
            header: 'Created Date',
            sortable: true,
        },
        {
            accessor: 'name',
            header: 'Wallet Name',
            sortable: true,
        },
        {
            accessor: 'token_address',
            header: 'Token Address',
            sortable: false,
        },
        
    ];

    return (
        <div>
            <span className='text-white'></span>
            <TanStackTable isLoading={isLoading} searchVal={searchVal} columns={columns} data={data} actions={[
                (row) => <Action trc20Address={row} fetchDataCallback={fetchData} />
                ]}   
            />
        </div>
    )
}