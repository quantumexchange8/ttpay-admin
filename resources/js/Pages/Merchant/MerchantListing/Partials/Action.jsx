import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Edit, Delete, FeatureWarningIcon } from '@/Components/Icon/Icon';
import Tooltip from "@/Components/Tooltip";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';
import { infinity } from 'ldrs';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import EditMerchant from '@/Pages/Merchant/MerchantListing/Partials/EditMerchant';

export default function Action({ merchant, fetchDataCallback, phoneCodes, rateProfiles }) {
    
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState(null);
    
    const handleEdit = () => {
        setActionType('edit');
        setIsOpen(true);

    };

    const { data, setData, post, processing, errors, reset } = useForm({
        id: merchant.id
    })

    const handleDelete = (merchantId) => {
        post('/merchant/deleteBin/', {
            merchantId: merchantId,
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsLoading(false);
                toast.success('Merchant Moved to Bin!', {
                    title: 'Merchant Moved to Bin!',
                    duration: Infinity,
                    description: 'You have moved a merchant to the bin. To undo this action, check it out in the merchant bin.',
                    variant: 'variant1',
                    actionText: 'Go to merchant Bin',
                    action: () => window.location.href = route('merchant.merchant-bin')
                });
                fetchDataCallback();
            }, 
            onError: (error) => {
                console.log('error')
                setIsLoading(false);
                
            }
        })
    };
    
    const closeModal = () => {
        setIsOpen(false)
        reset();
    }

    const user = usePage().props.auth.user

    return (
        <div className="flex justify-center items-center gap-3">
            <Tooltip text="Edit">
                <Button
                    type="button"
                    pill
                    onClick={handleEdit}
                    className="bg-transparent hover:bg-transparent"
                >
                    <Edit width={14} height={14} />
                </Button>
            </Tooltip>

            <Tooltip text="Delete">
                <Button
                    type="button"
                    pill
                    onClick={() => handleDelete(merchant.id)}
                    className="bg-transparent hover:bg-transparent"
                >
                    <Delete width={14} height={14} color="#dc2626"/>
                </Button>
                
            </Tooltip>

            <Modal show={isOpen} onClose={closeModal} title='Edit Merchant' maxWidth='xl' maxHeight='xl'>
                <EditMerchant closeModal={closeModal} phoneCodes={phoneCodes} rateProfiles={rateProfiles} merchant={merchant}/>
            </Modal>
        </div>
    )
}