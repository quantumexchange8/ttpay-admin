import TanStackTable from "@/Components/TanStackTable";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Action from '@/Pages/General/Pending/Partials/Action';
import Tooltip from "@/Components/Tooltip";
import { CopyIcon } from "@/Components/Icon/Icon";
import { mkConfig, generateCsv, download } from "export-to-csv";
import Modal from "@/Components/Modal";

export default function PendingTable({ searchVal, selectedDate, exportCsv, setExportCsv }) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tooltipText, setTooltipText] = useState('copy');
    
    const fetchData = async () => {
        try {
            const response = await axios.get('getPendingTransaction');
            
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const exportCSV = () => {
        const config = mkConfig({
            filename: 'pending_transactions',
            useKeysAsHeaders: true, // Use object keys as headers
        });

        console.log('Export config:', config); // Debug: Check config
        console.log('Data to export:', data); // Debug: Check data

        generateCsv(data, config); // Generate CSV with the data and config
        download(config); // Trigger the download
        
    };

    useEffect(() => {
        if (exportCsv) {
            exportCSV();
            setExportCsv(false); // Reset the exportCsv state
        }
    }, [exportCsv, setExportCsv, data]);

    useEffect(() => {
        fetchData(); 
    }, []);

    useEffect(() => {
        if (!isLoading) {
            // console.log('Data length:', data.length);
        }
    }, [isLoading, data]);

    const handleCopy = (tokenAddress) => {
        const textToCopy = tokenAddress;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setTooltipText('Copied!');
            console.log('Copied to clipboard:', textToCopy);

            // Revert tooltip text back to 'copy' after 2 seconds
            setTimeout(() => {
                setTooltipText('copy');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    const columns = [
        {
            accessor: 'tt_txn',
            header: 'ID',
            sortable: false,
            className: 'hidden xl:block',
        },
        {
            accessor: 'created_at',
            header: 'DateTime',
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
            accessor: 'to_wallet',
            header: 'USDT address',
            sortable: false,
            Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    
                    <div>{row.to_wallet}</div>
                    
                    <div onClick={() => handleCopy(row.to_wallet)} className="flex flex-col text-xs">
                        <Tooltip text={tooltipText}>
                            <CopyIcon />
                        </Tooltip>
                    </div>
                </div>
            ),
        },
        {
            accessor: 'total_amount',
            header: 'Amount',
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