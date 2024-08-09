import TanStackTable from "@/Components/TanStackTable";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Action from '@/Pages/Configuration/Payout/Partials/Action';

export default function PayoutConfigTable({searchVal}) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('/configuration/getPayoutConfig');
            
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
            header: 'Name',
            sortable: false,
        },
        {
            accessor: 'live_paymentUrl',
            header: 'Payment Url',
            sortable: false,
        },
        {
            accessor: 'appId',
            header: 'App ID',
            sortable: false,
        },
        {
            accessor: 'returnUrl',
            header: 'Return Url',
            sortable: false,
        },
        {
            accessor: 'callBackUrl',
            header: 'Callback Url',
            sortable: false,
        },
        {
            accessor: 'secret_key',
            header: 'TT Key',
            sortable: false,
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
                    (row) => <Action key={row.id} payout={row} fetchDataCallback={fetchData} />
                ]}
            />
        </div>
    )
}