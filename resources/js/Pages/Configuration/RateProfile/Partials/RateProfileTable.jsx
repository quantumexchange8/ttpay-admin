import React, { useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import axios from 'axios';
import { Edit, Delete } from '@/Components/Icon/Icon';
import { tailChase } from 'ldrs'
import EditRateProfile from "@/Pages/Configuration/RateProfile/Partials/EditRateProfile";
import Button from '@/Components/Button';
import Action from '@/Pages/Configuration/RateProfile/Partials/Actions';


export default function RateProfileTable({ searchVal }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    tailChase.register()

    const fetchData = async () => {
        try {
            const response = await axios.get('/configuration/getRateProfile');
            
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
            accessor: 'name',
            header: 'Rate Profile Name',
            sortable: false,
        },
        {
            accessor: 'merchant_id',
            header: 'Merchant',
            sortable: true,
        },
        {
            accessor: 'deposit_fee',
            header: 'Deposit Fee',
            sortable: true,
        },
        {
            accessor: 'withdrawal_fee',
            header: 'Withdrawal Fee',
            sortable: true,
        },
    ];

    return (  
    <div>
        <TanStackTable isLoading={isLoading} searchVal={searchVal} columns={columns} data={data} actions={[
            (row) => <Action rpDetail={row} fetchDataCallback={fetchData} />
            ]}   
        />
        
        <EditRateProfile/>
    </div>
    )
}