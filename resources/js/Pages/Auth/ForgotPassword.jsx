import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import { ForgetPasswordIcon, BackIcon } from '@/Components/Icon/Auth';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            {/* {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>} */}

            <div className='flex flex-col items-center gap-8'>
                <div className='w-full flex flex-col items-center gap-6'>
                    <div className='w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#ffffff0a] to-[#ffffff29] rounded-xl p-1'>
                        <ForgetPasswordIcon />
                    </div>
                    

                    <div className='flex flex-col items-center gap-2'>
                        <span className='text-white text-4xl font-semibold'>Forgot password?</span>

                        <span className='text-2xl text-gray-500'>No worries, we'll send you reset instructions.</span>
                    </div>
                </div>

                <form onSubmit={submit} className='w-full'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor="email" value="Email" />

                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder={'Enter registered email'}
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={(e) => setData('email', e.target.value)}
                                hasError={!!errors.email}
                            />

                            <InputError message={errors.email} className="mt-2" />

                        </div>
                        <div className='flex flex-col gap-3'>
                            <Button type='submit' size='lg' className='flex justify-center' disabled={processing}>
                                Send Email
                            </Button>

                            <Link href={route('login')}>
                                <Button type='button' size='lg' className='w-full flex justify-center gap-2 bg-transparent hover:bg-transparent' iconOnly>
                                    <BackIcon/>
                                    <span className='text-gray-300 text-sm font-semibold'>Back to log in</span>
                                </Button>
                            </Link>
                        </div>
                        
                    </div>
                    
                </form>
            </div>
            
        </GuestLayout>
    );
}
