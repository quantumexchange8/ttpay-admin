import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col gap-8 sm:justify-center items-center pt-6 sm:pt-0">
            <div className='flex flex-col items-center gap-6'>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>

                <div className='flex flex-col items-center gap-2'>
                    <span className='text-white text-4xl font-semibold'>Admin Portal</span>

                    <span className='text-2xl text-gray-500'>Welcome back! Please enter your details.</span>
                </div>

                
            </div>

            <div className="w-full sm:max-w-[400px]">
                {children}
            </div>
        </div>
    );
}
