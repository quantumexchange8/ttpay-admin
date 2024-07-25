import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input'
import { FreezingDashboard, PendingWithdrawal, TotalMerchant } from '@/Components/Icon/Brand';
import { ArrowRight } from '@/Components/Icon/Icon';
import { formatAmount } from '@/Composables';
import MonthlyMerchantDeposit from '@/Pages/DashboardPartials/MonthlyMerchantDeposit';
import MonthlyMerchantWithdrawal from '@/Pages/DashboardPartials/MonthlyMerchantWithdrawal';

export default function Dashboard({ auth, pendingWithdrawal, totalMerchant, total_freezing, total_freezing_amount, topMerchants }) {

    const { url } = usePage();

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

            <div className='flex flex-col flex-wrap gap-5 xl:flex-row'>
                <div className='flex flex-col gap-5 w-full lg:w-auto xl:w-full xxl:max-w-[868px]'>
                    <div className='flex w-full gap-5'>
                        <div className='p-5 flex flex-col h-40 justify-between bg-[#ffffff0d] rounded-xl w-full'>
                            <PendingWithdrawal />
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-gray-500 text-sm'>Pending Withdrawal</div>
                                    <div className='text-white text-lg font-bold'>
                                        $ {formatAmount(pendingWithdrawal)}
                                    </div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Link href={route('pending')}>
                                        <div className='w-6 h-6 rounded-full bg-gray-950 p-1'>
                                            <ArrowRight color='currentColor' className='text-white'/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='p-5 flex flex-col h-40 justify-between bg-[#ffffff0d] rounded-xl w-full'>
                            <TotalMerchant />
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-gray-500 text-sm'>Total Merchants</div>
                                    <div className='text-white text-lg font-bold'>
                                        {totalMerchant}
                                    </div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <Link href={route('merchant.merchant-listing')}>
                                        <div className='w-6 h-6 rounded-full bg-gray-950 p-1'>
                                            <ArrowRight color='currentColor' className='text-white'/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-5 h-[180px] flex flex-col justify-between bg-[#ffffff0d] rounded-xl w-full'>
                        <FreezingDashboard />
                        <div className='flex gap-5'>
                            <div className='flex flex-col gap-2 py-3 px-5 w-full bg-[#03071266] rounded'>
                                <div className='text-gray-500 text-sm'>Freezing Number</div>
                                <div className='text-white text-lg font-bold'>
                                    {total_freezing}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 py-3 px-5 w-full bg-[#03071266] rounded'>
                                <div className='text-gray-500 text-sm'>Freezing Amount</div>
                                <div className='text-white text-lg font-bold'>
                                    $ {formatAmount(total_freezing_amount)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <MonthlyMerchantDeposit />

                    <MonthlyMerchantWithdrawal /> 
                </div>

                <div className='p-5 h-full flex flex-col gap-5 w-full lg:w-auto xxl:max-w-[512px] bg-[#ffffff0d] backdrop-blur-3xl'>
                    <div className='flex flex-col gap-1'>
                        <div className='text-white text-lg font-bold'>Weekly Top 10 Deposit</div>
                        <div className='text-gray-500 font-xs'>Data updated from </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {topMerchants.map((topMerchant, index) =>(
                            <div className='flex flex-col gap-2 p-3 bg-[#03071266] rounded' key={index}>
                                <div className='flex items-center gap-3 w-full pb-3'>
                                    <div className='flex items-center w-9 h-9'>
                                        <img className='object-cover rounded-full' src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt="merchant_pic" />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className='text-white text-xs font-bold'>{topMerchant.merchant.name}</div>
                                        <div className='text-gray-500 text-xs'>{topMerchant.merchant.role_id}</div>
                                    </div>
                                    <div className=' w-8 h-8 text-white'>
                                        1
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
