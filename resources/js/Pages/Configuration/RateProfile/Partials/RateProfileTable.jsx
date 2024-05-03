import React, { useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import axios from 'axios';
import { Edit, Delete } from '@/Components/Icon/Icon';
import { tailChase } from 'ldrs'
import EditRateProfile from "@/Pages/Configuration/RateProfile/Partials/EditRateProfile";

export default function RateProfileTable() {

    const [data, setData] = useState([]);
    tailChase.register()

    useEffect(() => {
        fetchData(); 
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/configuration/getRateProfile');

            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = [
        {
            accessor: 'name',
            header: 'Rate Profile Name',
        },
        {
            accessor: 'merchant_id',
            header: 'Merchant',
        },
        {
            accessor: 'deposit_fee',
            header: 'Deposit Fee',
        },
        {
            accessor: 'withdrawal_fee',
            header: 'Withdrawal Fee',
        },
    ];


    const handleEdit = (row) => {
        
    };

    const handleDelete = (row) => {
        
    };

    return (  
    <div>
        {data.length > 0 ? (
            <TanStackTable columns={columns} data={data} actions={[
                <Edit width={14} height={14} onClick={handleEdit} />,
                <Delete width={14} height={14} color="#dc2626" onClick={handleDelete}/>
              ]} />
        ) : (
            <div className='flex justify-center items-center'>
                <l-tail-chase
                    size="30"
                    speed="1.5" 
                    color="white" 
                ></l-tail-chase>
            </div>
            
        )}
        
        <EditRateProfile/>
    </div>
    )
}