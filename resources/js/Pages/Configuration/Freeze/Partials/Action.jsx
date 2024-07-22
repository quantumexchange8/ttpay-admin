import Button from "@/Components/Button";
import { UnfreezeIcon } from "@/Components/Icon/Brand";
import Modal from "@/Components/Modal";
import Tooltip from "@/Components/Tooltip";
import { useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import toast from 'react-hot-toast';

export default function Action({ transaction, fetchDataCallback }) {

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [actionType, setActionType] = useState(null);

    const closeModal = () => {
        setIsOpen(false)
        reset();
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        id: transaction.id,
        merchant_id: transaction.merchant.id,
    })

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post('/configuration/unfreezeTransaction', {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setIsLoading(false);
                reset();
                toast.success('Request Unfrozen', {
                    title: 'Request Unfrozen',
                    duration: Infinity,
                    description: 'You have successfully unfroze the withdrawal request. Check it out in the pending listing.',
                    variant: 'variant1',
                    actionText: 'Go to pending',
                    action: () => window.location.href = route('pending')
                });

                fetchDataCallback();
            }, 
            onError: () => {
                setIsLoading(false);
            }

        })
    }

    return (
        <div className="flex justify-center items-center gap-3">
            <Tooltip text="Unfreeze">
                <form onSubmit={submit}>
                    <Button
                        type="submit"
                        pill
                        className="bg-transparent hover:bg-transparent"
                    >
                        <UnfreezeIcon width={14} height={14} color="#dc2626"/>
                    </Button>
                </form>
            </Tooltip>

        </div>
    )
}