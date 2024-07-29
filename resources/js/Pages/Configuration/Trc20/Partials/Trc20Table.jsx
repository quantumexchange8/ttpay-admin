import React, { useState, useEffect } from 'react';
import TanStackTable from '@/Components/TanStackTable';
import axios from 'axios';
import Action from '@/Pages/Configuration/Trc20/Partials/Actions';
import {formatDateTime} from '@/Composables/index';

export default function Trc20Table({ searchVal, exportCsv, setExportCsv }) {

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

    const exportDataToCsv = async () => {
        setIsLoading(true);
        try {
            const params = {
                exportCsv: 'true'
            };

            const response = await axios.get('/configuration/getTrc20Address', {
                params,
                responseType: 'blob' // Important for file downloads
            });

            // Create a link to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Trc20-Address.xlsx');
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
            exportDataToCsv();
        } else {
            fetchData();
        }
    }, [exportCsv]);

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
            <TanStackTable 
                isLoading={isLoading} 
                searchVal={searchVal} 
                columns={columns} 
                data={data} 
                actions={[
                    (row) => <Action key={row.id} trc20Address={row} fetchDataCallback={fetchData} />
                ]}   
            />
        </div>
    )
}