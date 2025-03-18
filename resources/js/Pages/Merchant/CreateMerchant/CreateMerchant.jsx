import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, } from '@inertiajs/react';
import { Alert, ArrowRight, Delete, PlusIcon } from '@/Components/Icon/Icon';
import { useEffect, useState } from 'react';
import MerchantProfile from '@/Pages/Merchant/CreateMerchant/Partials/MerchantProfile'
import Configuration from '@/Pages/Merchant/CreateMerchant/Partials/Configuration'
import EmailContent from '@/Pages/Merchant/CreateMerchant/Partials/EmailContent'
import toast from 'react-hot-toast';

const approvalMode = [
    {
      name: 'Manual Approval of Deposit',
      value: '0'
    },
    {
      name: 'Automatic Approval of Deposit',
      value: '1'
    },
    {
        name: 'TxID Approval of Deposit',
        value: '2'
      },
  ];

  const negoMode = [
    {
      name: 'Don Allow different amount',
      value: '0'
    },
    {
      name: 'Allow different amount',
      value: '1'
    },
  ];

export default function CreateMerchant({ auth, rateProfiles, trc20Addressess, phoneCodes, refreshOptions }) {

    const [step, setStep] = useState(1);
    const [ isActive, setIsActive ] = useState()
    const [selectedPhoneCode, setSelectedPhoneCode] = useState('+60');
    const [selectedRateProfile, setSelectedRateProfile] = useState(null);
    // const [selectedRefresh, setSelectedRefresh] = useState(refreshOptions[0]);

    const [selectedMode, setSelectedMode] = useState(approvalMode[0]);
    const [selectedNegoMode, setSelectedNegoMode] = useState(negoMode[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [emailFields, setEmailFields] = useState([]);

    const [enabledClientName, setEnabledClientName ] = useState(false)
    const [enabledClientEmail, setEnabledClientEmail ] = useState(false)
    const [enabledClientId, setEnabledClientId ] = useState(false)
    const [enabledDepositAmount, setEnabledDepositAmount ] = useState(false)
    const [enabledDateTime, setEnabledDateTime ] = useState(false)
    const [enabledClientUsdt, setEnabledClientUsdt ] = useState(false)
    const [enabledClientUsdtReceive, setEnabledClientUsdtReceive ] = useState(false)
    const [enabledTxid, setEnabledTxid ] = useState(false)
    const [enabledPhoto, setEnabledPhoto ] = useState(false)
    
    const { data, setData, post, processing, reset } = useForm({
        //page 1
        name: '',
        manager_name: '',
        email: '',
        dial_code: selectedPhoneCode,
        phone: '',

        // page 2
        rate_profile: '',
        url: '',
        auto_refresh: '',
        wallet_address: [], //pass wallet_address id with array
        approval_mode: approvalMode[0].value,
        nego_mode: negoMode[0].value,
        amount_range: '',
        email_receiving: '',
        emailOptional: [],

        // page 3
        client_name: enabledClientName ? 1 : 0,
        client_email: enabledClientEmail ? 1 : 0,
        client_id: enabledClientId ? 1 : 0,
        deposit_amount: enabledDepositAmount ? 1 : 0,
        data_time: enabledDateTime ? 1 : 0,
        client_usdt_address: enabledClientUsdt ? 1 : 0,
        usdt_address_receiving: enabledClientUsdtReceive ? 1 : 0,
        show_txid: enabledTxid ? 1 : 0,
        photo_uploaded: enabledPhoto ? 1 : 0,
    })

    useEffect(() => {
        if (selectedRateProfile && data.rate_profile !== selectedRateProfile.id) {
            setData('rate_profile', selectedRateProfile.id);
        }
        if (selectedPhoneCode !== null && data.dial_code !== selectedPhoneCode) {
            setData('dial_code', selectedPhoneCode);
        }
        // if (selectedRefresh !== null && data.auto_refresh !== selectedRefresh.value) {
        //     setData('auto_refresh', selectedRefresh.value);
        // }
        if (selectedAddresses !== null && data.wallet_address !== selectedAddresses) {
            setData('wallet_address', selectedAddresses);
        }
        if (data.approval_mode !== selectedMode.value) {
            setData('approval_mode', selectedMode.value);
        }
        if (data.nego_mode !== selectedNegoMode.value) {
            setData('nego_mode', selectedNegoMode.value);
        }
        if (data.client_name !== (enabledClientName ? 1 : 0)) {
            setData('client_name', enabledClientName ? 1 : 0);
        }
        if (data.client_email !== (enabledClientEmail ? 1 : 0)) {
            setData('client_email', enabledClientEmail ? 1 : 0);
        }
        if (data.client_id !== (enabledClientId ? 1 : 0)) {
            setData('client_id', enabledClientId ? 1 : 0);
        }
        if (data.deposit_amount !== (enabledDepositAmount ? 1 : 0)) {
            setData('deposit_amount', enabledDepositAmount ? 1 : 0);
        }
        if (data.data_time !== (enabledDateTime ? 1 : 0)) {
            setData('data_time', enabledDateTime ? 1 : 0);
        }
        if (data.client_usdt_address !== (enabledClientUsdt ? 1 : 0)) {
            setData('client_usdt_address', enabledClientUsdt ? 1 : 0);
        }
        if (data.usdt_address_receiving !== (enabledClientUsdtReceive ? 1 : 0)) {
            setData('usdt_address_receiving', enabledClientUsdtReceive ? 1 : 0);
        }
        if (data.show_txid !== (enabledTxid ? 1 : 0)) {
            setData('show_txid', enabledTxid ? 1 : 0);
        }
        if (data.photo_uploaded !== (enabledPhoto ? 1 : 0)) {
            setData('photo_uploaded', enabledPhoto ? 1 : 0);
        }

        //   setData('client_name', enabledClientName);

    }, [
        selectedRateProfile, 
        selectedPhoneCode,
        // selectedRefresh,
        selectedAddresses,
        selectedMode,
        selectedNegoMode,
        enabledClientName,
        data.rate_profile, 
        data.dial_code,
        data.auto_refresh,
        data.wallet_address,
        data.approval_mode,
        data.nego_mode,
        setData
    ]);

    const nextPage = () => {
        if (step === 1) {
            setStep(step + 1);
        } else if (step === 2) {
            setStep(step + 1);
        }
    };
    

    const prevPage = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const resetFormStates = () => {
        reset();
        setStep(1);
        setSelectedPhoneCode('+60');
        setSelectedRateProfile(null);
        // setSelectedRefresh(refreshOptions[0]);
        setSelectedMode(approvalMode[0]);
        setSelectedNegoMode(negoMode[0]);
        setSelectedAddresses([]);
        setEmailFields([]);
        setEnabledClientName(false);
        setEnabledClientEmail(false);
        setEnabledClientId(false);
        setEnabledDepositAmount(false);
        setEnabledDateTime(false);
        setEnabledClientUsdt(false);
        setEnabledClientUsdtReceive(false);
        setEnabledTxid(false);
        setEnabledPhoto(false);
    };

    const submit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        post('/merchant/store-merchant', {
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
                resetFormStates();
                toast.success('New merchant created', {
                    title: 'New merchant created',
                    duration: Infinity,
                    description: 'You have successfully created a new merchant to the portal. Check it out in the merchant listing.',
                    variant: 'variant1',
                    actionText: 'Go to merchant listing',
                    action: () => window.location.href = route('merchant.merchant-listing')
                });
            }, 
            onError: () => {
                setIsLoading(false);
            }

        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Create Merchant"
        >

            <Head title="Create Merchant" />

            <form onSubmit={submit} className='py-10 md:py-[60px]'>
                <div className='flex flex-col items-center gap-10'>
                    {/* PROGRESS BAR */}
                    <div className='max-w-[603px] flex md:items-center gap-1 md:gap-5'>
                        <div className='flex flex-col md:flex-row items-center gap-1 md:gap-2'>
                            <div className='w-9 h-9 flex items-center justify-center py-2 px-[10px] bg-primary-700 rounded-full'>
                                <span className='text-white text-sm font-semibold '>1</span>
                            </div>
                            <div className='text-xs md:text-base font-semibold text-white text-center leading-tight'>
                                Merchant Profile
                            </div>
                        </div>
                        <ArrowRight width={24} height={24} color='currentColor' className={step === 2 || step === 3 ? 'text-white' : 'text-gray-400'}/>
                        <div className='flex flex-col md:flex-row items-center gap-1 md:gap-2'>
                            <div className={step === 2 || step === 3  ? 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-primary-700' : 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-gray-800'}>
                                <span className='text-white text-sm font-semibold '>2</span>
                            </div>
                            <div className={step === 2 || step === 3 ? 'text-xs md:text-base font-semibold text-white text-center h-10 md:h-auto' : 'text-xs md:text-base font-semibold text-gray-500 text-center h-10 md:h-auto'}>Configuration</div>
                        </div>
                        <ArrowRight width={24} height={24} color='currentColor' className={step === 3 ? 'text-white' : 'text-gray-400'}/>
                        <div className='flex flex-col md:flex-row items-center gap-1 md:gap-2'>
                            <div className={step === 3 ? 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-primary-700' : 'w-9 h-9 flex items-center justify-center py-2 px-[10px] rounded-full bg-gray-800'}>
                                <span className='text-white text-sm font-semibold '>3</span>
                            </div>
                            <div className={step === 3 ? 'text-xs md:text-base font-semibold text-white text-center leading-tight' : 'text-xs md:text-base font-semibold text-gray-500 text-center leading-tight'}>Email Content</div>
                        </div>
                    </div>

                    {/* PAGE 1 */}
                    {step === 1 && (
                        <MerchantProfile 
                            data={data}
                            phoneCodes={phoneCodes}
                            selectedPhoneCode={selectedPhoneCode}
                            setSelectedPhoneCode={setSelectedPhoneCode}
                            nextPage={nextPage}
                            setData={setData}
                        />
                    )}
                    
                    {/* PAGE 2 */}
                    {step === 2 && (
                        <Configuration
                            data={data}
                            nextPage={nextPage}
                            prevPage={prevPage}
                            setData={setData}
                            selectedRateProfile={selectedRateProfile}
                            setSelectedRateProfile={setSelectedRateProfile}
                            rateProfiles={rateProfiles}
                            // selectedRefresh={selectedRefresh}
                            // setSelectedRefresh={setSelectedRefresh}
                            // refreshOptions={refreshOptions}
                            trc20Addressess={trc20Addressess}
                            selectedAddresses={selectedAddresses}
                            setSelectedAddresses={setSelectedAddresses}
                            selectedMode={selectedMode}
                            setSelectedMode={setSelectedMode}
                            approvalMode={approvalMode}
                            negoMode={negoMode}
                            selectedNegoMode={selectedNegoMode}
                            setSelectedNegoMode={setSelectedNegoMode}
                            emailFields={emailFields}
                            setEmailFields={setEmailFields}
                        />
                        
                    )}

                    {/* PAGE 3 */}
                    {step === 3 && (
                        <EmailContent
                            data={data}
                            prevPage={prevPage}
                            setData={setData}
                            enabledClientName={enabledClientName}
                            setEnabledClientName={setEnabledClientName}
                            enabledClientEmail={enabledClientEmail}
                            setEnabledClientEmail={setEnabledClientEmail}
                            enabledClientId={enabledClientId}
                            setEnabledClientId={setEnabledClientId}
                            enabledDepositAmount={enabledDepositAmount}
                            setEnabledDepositAmount={setEnabledDepositAmount}
                            enabledDateTime={enabledDateTime}
                            setEnabledDateTime={setEnabledDateTime}
                            enabledClientUsdt={enabledClientUsdt}
                            setEnabledClientUsdt={setEnabledClientUsdt}
                            enabledClientUsdtReceive={enabledClientUsdtReceive}
                            setEnabledClientUsdtReceive={setEnabledClientUsdtReceive}
                            enabledTxid={enabledTxid}
                            setEnabledTxid={setEnabledTxid}
                            enabledPhoto={enabledPhoto}
                            setEnabledPhoto={setEnabledPhoto}
                            isLoading={isLoading}
                        />
                    )}
                    
                </div>
            </form>
            

        </AuthenticatedLayout>
    )
}