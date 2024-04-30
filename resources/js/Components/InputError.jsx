import { Alert } from '@/Components/Icon/Icon';

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-error-600 dark:text-error-400 ' + className}>
            <Alert/> {message}
        </p>
    ) : null;
}
