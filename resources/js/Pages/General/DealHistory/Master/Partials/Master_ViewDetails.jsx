import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { ViewDetailsIcon } from '@/Components/Icon/Icon';
import Tooltip from "@/Components/Tooltip";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import DealHistoryDetails from '@/Pages/General/DealHistory/Master/Partials/Master_DealHistoryDetails';

export default function ViewDetails({ client_id, fetchDataCallback, transactions }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        id: client_id.id
    });

    const closeModal = () => {
        setIsOpen(false);
        reset();
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <div className="flex justify-center items-center">
            <Tooltip text="View">
                <Button
                    type="button"
                    onClick={openModal}
                    className="bg-transparent hover:bg-transparent"
                >
                    <ViewDetailsIcon />
                </Button>
            </Tooltip>

            <Modal show={isOpen} onClose={closeModal} maxWidth='md' title='View Deal History Details' classNames='text-xl'>
                <DealHistoryDetails closeModal={closeModal} transaction={client_id} />
            </Modal>
        </div>
    );
}
