import React, { useState, useEffect } from 'react';
// import TanStackTable from '@/Components/TanStackTable';
import axios from 'axios';

export default function RateProfileTable() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            // Make a GET request to your Laravel backend API to fetch data
            const response = await axios.get('/configuration/getRateProfile');

            // Set the fetched data to the state
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const columns = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        // Add more columns as needed
    ];

    return (  
    <div>
        {/* <table className='w-full'>
            <thead className='text-xs text-gray-500 bg-gray-600 px-3 font-bold'>
                <tr>
                    <th className='py-3 text-left'>RATE RPOFILE NAME</th>
                    <th className='py-3 text-left'>Merchant</th>
                    <th className='py-3 text-left'>Deposit Fee</th>
                    <th className='py-3 text-left'>Withdrawal Fee</th>
                </tr>
            </thead>
            <tbody className='bg-gray-800 p-3 text-xs '>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                </tr>
            </tbody>
        </table> */}
    </div>
    )
}