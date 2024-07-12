import { CheckIcon } from '@heroicons/react/16/solid';
import { useState, useEffect } from 'react';
import { XIcon } from '@/Components/Icon/Outline';

export default function DealHistory_Filter({ closeFilter, applyFilters, resetFilters, remainOptions}) { 
    const [filters, setFilters] = useState({
        success: false,
        rejected: false,
        minAmount: '',
        maxAmount: '',
        minFee: '',
        maxFee: ''
    });

    const [notification, setNotification] = useState(''); // State for notification without filling any filter's option 

    useEffect(() => {
        setFilters(remainOptions);
    }, [remainOptions]);

    const handleCheckboxChange = (field) => {
        setFilters(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyFilters = () => {
        const { success, rejected, minAmount, maxAmount, minFee, maxFee } = filters;
        if (!success && !rejected && !minAmount && !maxAmount && !minFee && !maxFee) {
            setNotification('*Please select or input at least one filter option.'); // Set notification message
        } else {
            applyFilters(filters);
            setNotification(''); // Clear notification message
        }
    };

    const handleReset = () => {
        const resetFilterState = {
            success: false,
            rejected: false,
            minAmount: '',
            maxAmount: '',
            minFee: '',
            maxFee: ''
        };
        setFilters(resetFilterState);
        resetFilters();
        setNotification(''); // Clear notification message
    };

    return (
        <div className='absolute left-[100px] bg-white/5 backdrop-blur-[60px] text-white p-4 rounded-lg shadow-lg w-[240px]'>
            <div className='flex flex-col gap-6'>
                <div className='flex justify-between items-center'>
                    <div className='text-base font-semibold'>Filters</div>
                    <button className='text-gray-400 hover:text-white' onClick={closeFilter}>
                        <XIcon className='w-5 h-5' />
                    </button>
                </div>
                <div>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-3'>
                                <div className='text-neutral-300 text-xs font-bold'>STATUS</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => handleCheckboxChange('success')}
                                    className={`group size-6 rounded-[41px] p-1 ring-1 ring-white/15 ring-inset ${filters.success ? 'bg-primary-700' : 'bg-white/10'}`}
                                >
                                    {filters.success && (
                                        <CheckIcon className="size-4 fill-white" />
                                    )}
                                </div>
                                <div>Success</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => handleCheckboxChange('rejected')}
                                    className={`group size-6 rounded-[41px] p-1 ring-1 ring-white/15 ring-inset ${filters.rejected ? 'bg-primary-700' : 'bg-white/10'}`}
                                >
                                    {filters.rejected && (
                                        <CheckIcon className="size-4 fill-white" />
                                    )}
                                </div>
                                <div>Rejected</div>
                            </div>
                        </div>

                        <div className='w-full h-[1px] bg-neutral-700'></div>

                        <div className='flex flex-col gap-[12px]'>
                            <div className='text-neutral-300 text-xs font-bold text-left'>
                                AMOUNT RANGE
                            </div>
                            <div className='flex gap-[12px] items-center'>
                                <input
                                    type="text"
                                    name='minAmount'
                                    placeholder='Min.'
                                    className='flex flex-col text-left p-2 text-white bg-white/5 rounded-md w-[88px] border-none'
                                    value={filters.minAmount}
                                    onChange={handleInputChange}
                                />
                                <div>-</div>
                                <input
                                    type="text"
                                    name='maxAmount'
                                    placeholder='Max.'
                                    className='flex flex-col text-left p-2 text-white bg-white/5 rounded-md w-[88px] border-none'
                                    value={filters.maxAmount}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-[12px]'>
                            <div className='text-neutral-300 text-xs font-bold text-left'>
                                FEE RANGE
                            </div>
                            <div className='flex gap-[12px] items-center'>
                                <input
                                    type="text"
                                    name='minFee'
                                    placeholder='Min.'
                                    className='flex flex-col text-left p-2 text-white bg-white/5 rounded-md w-[88px] border-none'
                                    value={filters.minFee}
                                    onChange={handleInputChange}
                                />
                                <div>-</div>
                                <input
                                    type="text"
                                    name='maxFee'
                                    placeholder='Max.'
                                    className='flex flex-col text-left p-2 text-white bg-white/5 rounded-md w-[88px] border-none'
                                    value={filters.maxFee}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[1px] bg-neutral-700 mt-4'></div>

                    {notification && ( // Conditionally render the notification to prevent empty filter option
                        <div className="text-red-500 text-xs mt-2">{notification}</div>
                    )}

                    <div className='flex justify-between mt-4 gap-3'>
                        <button 
                            className='bg-gray-700 w-full text-white px-4 py-3 text-sm font-semibold rounded-md hover:bg-gray-600'
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                        <button 
                            className='bg-primary-700 w-full text-white px-4 py-3 text-sm font-semibold rounded-md hover:bg-purple-500'
                            onClick={handleApplyFilters}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
