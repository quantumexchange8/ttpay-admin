import React, { useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import axios from 'axios';
import Action from '@/Pages/Configuration/Trc20/Partials/Actions';

export default function Trc20Table() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(); 
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/configuration/getTrc20Address');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
            <TanStackTable columns={columns} data={data} actions={[
                (row) => <Action trc20Address={row} fetchDataCallback={fetchData} />
                ]}   
            />
        </div>
    )
}