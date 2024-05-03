import { toast, Toaster, ToastBar } from 'react-hot-toast';
import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

function CustomToaster({ toastMessage }) {

    const page = usePage();
    const { toast } = usePage().props

    useEffect(() => {
        if (toastMessage) {
            const { type, message } = toastMessage;
            switch (type) {
                case 'success':
                    toast.success(message);
                    break;
                case 'error':
                    toast.error(message);
                    break;
                // Add more cases for different types of messages
                default:
                    toast(message);
            }
        }
    }, [toastMessage]);

    return <Toaster />;
}

  export { CustomToaster };