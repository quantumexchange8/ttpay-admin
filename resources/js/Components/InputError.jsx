import { Alert } from '@/Components/Icon/Icon';

export default function InputError({ message, className = ''}) {
    return message ?  (
        <div className={'text-sm text-error-600 dark:text-error-600 ' + className}> 
            <div className='flex items-center gap-1'>
                <Alert/> 
                <p>{message}</p>
            </div>
        </div>
    ) : null;
}
