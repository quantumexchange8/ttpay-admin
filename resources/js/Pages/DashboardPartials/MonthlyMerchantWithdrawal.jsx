import { CreditCardIcon, FeeChargesIcon, NetBalanceIcon } from "@/Components/Icon/Icon";
import React from "react";
import LineChart from "@/Components/LineChart";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import { Menu, Switch, Transition } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { formatAmount } from "@/Composables";
import colors from "tailwindcss/colors";

const months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
];

const years = [
    {
        label: '2024',
        value: '2024'
    },
];

export default function MonthlyMerchantWithdrawal() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [grossDeposit, setGrossDeposit] = useState(0);
    const [fee, setFee] = useState(0);
    const [netBalance, setNetBalance] = useState(0);

    const fetchData = async () => {
        try {
            const response = await axios.get('/getMonthlyMerchantWithdrawal', {
                params: {
                    year: selectedYear,
                    month: selectedMonth,
                },
            });
            
            setData(response.data.transactions);
            setGrossDeposit(response.data.gross_deposit);
            setFee(response.data.fee_charges);
            setNetBalance(response.data.net_balance);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
      }, [selectedYear, selectedMonth]);

    useEffect(() => {
        if (!isLoading) {
            // console.log('Data length:', data.length);
        }
    }, [isLoading, data]);

    const onSelect = (year) => {
        setSelectedYear(year);
    };

    const onSelectMonth = (month) => {
        setSelectedMonth(month);
    }

    const processChartData = (data) => {
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
        const chartData = {
          labels: days,
          datasets: [
            {
              label: 'Daily Merchant Deposits',
              data: days.map((day) => {
                const dayData = data.filter(transaction => new Date(transaction.created_at).getDate() === day);
                return dayData.reduce((sum, transaction) => sum + transaction.amount, 0); // Assuming 'amount' is the field you want to sum up
              }),
              fill: true,
              backgroundColor: ['rgba(220, 38, 38, 0.1)', 'rgba(22, 163, 74, 0.0)'],
              borderColor: '#DC2626',
            },
          ],
        };
    
        return chartData;
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: false,
              text: 'Day',
              font: {
                family: 'Manrope',
                size: 12,
                style: 'normal',
                weight: 'normal',
                color: '#D1D5DB'
              },
            },
          },
          y: {
            title: {
              display: false,
              text: 'Amount',
              font: {
                family: 'Manrope',
                size: 12,
                style: 'normal',
                weight: 'normal',
                color: '#D1D5DB'
              },
            },
            min: 0,
            ticks: {
                callback: function(value, index, values) {
                  return '$' + value; // Add '$' symbol to y-axis labels
                }
              }
          },
        },
    };

    const getMonthLabel = (value) => {
        const month = months.find(m => m.value === value);
        return month ? month.label : '';
    };

    const chartData = processChartData(data);

    return (
        <div className='flex flex-col gap-8 py-8 px-5 bg-[#ffffff0d]'>
            <div className='flex gap-3 w-full'>
                <div className="flex gap-3 w-full">
                    <div className=" rounded-xl bg-[#ffffff0d] p-3"><CreditCardIcon /></div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm text-gray-500">Total Withdrawal</div>
                        <div className="text-white text-base font-semibold">
                            $ {formatAmount(grossDeposit)}
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 w-full">
                    <div className=" rounded-xl bg-[#ffffff0d] p-3"><FeeChargesIcon /></div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm text-gray-500">Fee Charges</div>
                        <div className="text-white text-base font-semibold">
                            $ {formatAmount(fee)}
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 w-full">
                    <div className=" rounded-xl bg-[#ffffff0d] p-3"><NetBalanceIcon /></div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm text-gray-500">Net Balance</div>
                        <div className="text-white text-base font-semibold">
                            $ {formatAmount(netBalance)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <div className="text-white text-lg font-bold">
                    Monthly Merchant's Withdrawal
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#03071266] py-2 px-3 text-white text-xs font-medium rounded-lg">
                        <div className="w-[100px] text-center">
                            <Menu as="div" className="relative inline-block">
                                <div>
                                <Menu.Button className="inline-flex gap-1 items-center w-full justify-center rounded-md text-xs font-medium text-white focus:outline-none">
                                    <div className="w-[60px]">
                                        {getMonthLabel(selectedMonth)}
                                    </div>
                                    <ChevronDownIcon
                                    className="h-5 w-5 text-violet-200 hover:text-violet-100"
                                    aria-hidden="true"
                                    />
                                </Menu.Button>
                                </div>
                                <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-[-20px] mt-2 w-[124px] origin-top-right rounded-md bg-[#03071266] shadow-lg focus:outline-none backdrop-blur-3xl">
                                        <div className="px-1 py-1 ">
                                            {
                                                months.map((month, index) => (
                                                    <div key={index}>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                            <button
                                                                className={`${
                                                                active ? 'text-white' : 'text-white'
                                                                } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm hover:bg-[#ffffff1a]`}
                                                                onClick={() => {
                                                                    onSelectMonth(month.value);
                                                                }}
                                                                type="button"
                                                            >
                                                                {month.label}
                                                            </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            </div>
                    </div>
                    <div className="bg-[#03071266] py-2 px-3 text-white text-xs font-medium rounded-lg">
                        <div className="w-[60px]">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button 
                                        type='button'
                                        className="inline-flex w-full justify-center items-center rounded-md text-xs font-medium text-white focus:outline-none"
                                    >
                                        <span className='w-12 text-left'>
                                            {selectedYear}
                                        </span>
                                        <ChevronDownIcon
                                        className="h-4 w-4 text-violet-200 "
                                        aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute mt-2.5 py-2 rounded-md bg-[#03071266] shadow-lg focus:outline-none backdrop-blur-[60px]">
                                        {years.map((year, index) => (
                                            <div key={index}>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                        className={`${
                                                            active ? ' text-white' : 'text-white'
                                                            } group flex items-center rounded-md px-4 py-2 text-sm hover:bg-[#ffffff1a]`}
                                                            onClick={() => {
                                                                onSelect(year.value);
                                                            }}
                                                            type="button"
                                                        >
                                                            {year.value}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        ))}
                                        
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <LineChart data={chartData} options={options} />
            </div>
        </div>
    )
}