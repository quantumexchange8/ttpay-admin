import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input'
import { FreezingDashboard, PendingWithdrawal, TotalMerchant } from '@/Components/Icon/Brand';
import { ArrowRight, PolygonIcon } from '@/Components/Icon/Icon';
import { formatAmount } from '@/Composables';
import MonthlyMerchantDeposit from '@/Pages/DashboardPartials/MonthlyMerchantDeposit';
import MonthlyMerchantWithdrawal from '@/Pages/DashboardPartials/MonthlyMerchantWithdrawal';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Dashboard({ auth, pendingWithdrawal, totalMerchant, total_freezing, total_freezing_amount, topMerchants }) {

    const { t } = useTranslation();
    const { url } = usePage();
    const [ currentDayToWeek, setCurrentDayToWeek ] = useState('')

    useEffect(() => {
        const today = dayjs();
    
        const startOfWeek = today.subtract(6, 'days').format('DD MMM YYYY');
        const endOfWeek = today.format('DD MMM YYYY');
    
        // Set the date range in the state
        setCurrentDayToWeek(`${startOfWeek} to ${endOfWeek}`);
      }, []);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Dashboard"
        >
            <Head title="Dashboard" />

            <div className='flex flex-col flex-wrap gap-5 xxl:grid xxl:grid-cols-3'>
                <div className='flex flex-col gap-5 w-full lg:w-auto xl:w-full xxl:col-span-2'>
                    <div className='flex flex-col md:flex-row w-full gap-5'>
                        <div className='w-full'>
                            <Link href={route('pending')}>
                                <div className='p-5 flex flex-col h-40 justify-between bg-[#ffffff0d] hover:bg-[#ffffff1a] rounded-xl w-full'>
                                    <PendingWithdrawal />
                                    <div className='flex justify-between'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='text-gray-500 text-sm'>{t('pending_withdrawal')}</div>
                                            <div className='text-white text-lg font-bold'>
                                                $ <CountUp end={pendingWithdrawal} duration={1.5} decimals={2}/> 
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <div className='w-6 h-6 rounded-full bg-gray-950 p-1'>
                                                <ArrowRight color='currentColor' className='text-white'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='w-full'>
                            <Link href={route('merchant.merchant-listing')}>
                                <div className='p-5 flex flex-col h-40 justify-between bg-[#ffffff0d] hover:bg-[#ffffff1a] rounded-xl w-full'>
                                    <TotalMerchant />
                                    <div className='flex justify-between'>
                                        <div className='flex flex-col gap-2'>
                                            <div className='text-gray-500 text-sm'>Total Merchants</div>
                                            <div className='text-white text-lg font-bold'>
                                                <CountUp end={totalMerchant} duration={1.5} />
                                            </div>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <div className='w-6 h-6 rounded-full bg-gray-950 p-1'>
                                                <ArrowRight color='currentColor' className='text-white'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='p-5 md:h-[180px] flex flex-col gap-3 md:justify-between bg-[#ffffff0d] rounded-xl w-full'>
                        <FreezingDashboard />
                        <div className='flex flex-col md:flex-row gap-2 md:gap-5'>
                            <div className='flex flex-col gap-2 py-3 px-5 w-full bg-[#03071266] rounded'>
                                <div className='text-gray-500 text-sm'>Freezing Number</div>
                                <div className='text-white text-lg font-bold'>
                                    {total_freezing}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 py-3 px-5 w-full bg-[#03071266] rounded'>
                                <div className='text-gray-500 text-sm'>Freezing Amount</div>
                                <div className='text-white text-lg font-bold'>
                                    $ <CountUp end={total_freezing_amount} duration={1.5} decimals={2}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <MonthlyMerchantDeposit />

                    <MonthlyMerchantWithdrawal /> 
                </div>

                <div className='p-4 md:p-5 h-full flex flex-col gap-5 w-full lg:w-auto xxl:min-w-[340px] xxl:w-auto bg-[#ffffff0d] backdrop-blur-3xl'>
                    <div className='flex flex-col gap-1'>
                        <div className='text-white text-lg font-bold'>Weekly Top 10 Deposit</div>
                        <div className='text-gray-500 font-xs'>Data updated from {currentDayToWeek}</div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {topMerchants.map((topMerchant, index) =>(
                            <div className='flex flex-col gap-2 p-3 bg-[#03071266] rounded' key={index}>
                                <div className='flex items-center gap-3 w-full pb-3'>
                                    <div className='flex items-center justify-center w-12 xxl:w-1/6 '>
                                        <img className='object-cover rounded-full w-9 h-9' src={topMerchant.merchant.first_media_url ? topMerchant.merchant.first_media_url : 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt="merchant_pic" />
                                    </div>
                                    <div className='flex flex-col w-full xxl:w-4/6 '>
                                        <div className='text-white text-xs font-bold'>{topMerchant.merchant.name}</div>
                                        <div className='text-gray-500 text-xs'>{topMerchant.merchant.role_id}</div>
                                    </div>
                                    <div className='w-12 xxl:w-1/6 h-8 text-white text-base relative'>
                                        <PolygonIcon />
                                        <span className='absolute inset-y-0 left-2.5 flex items-center justify-center'>{index + 1}</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div className='flex flex-col items-center gap-1 w-full'>
                                        <div className='text-gray-500 text-xs'>Gross Deposit</div>
                                        <div className='text-white text-sm font-semibold'>$ {topMerchant.gross_deposit}</div>
                                    </div>
                                    <div className='flex flex-col items-center gap-1 w-full'>
                                        <div className='text-gray-500 text-xs'>Fee Charges</div>
                                        <div className='text-white text-sm font-semibold'>$ {topMerchant.total_fee}</div>
                                    </div>
                                    <div className='flex flex-col items-center gap-1 w-full'>
                                        <div className='text-gray-500 text-xs'>Net Balance</div>
                                        <div className='text-success-500 text-sm font-semibold'>$ {topMerchant.net_deposit}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
