import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import { ForgetPasswordIcon, BackIcon } from '@/Components/Icon/Auth';
import { EyeOff, EyeOn } from '@/Components/Icon/Icon';
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import InputIconWrapper from '@/Components/InputIconWrapper';

export default function ResetPassword({ token, email }) {

    const [showPassword, setShowPassword ] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className='flex flex-col items-center gap-8'>
                <div className='w-full flex flex-col items-center gap-6'>
                    <div className='w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#ffffff0a] to-[#ffffff29] rounded-xl p-1'>
                        <ForgetPasswordIcon />
                    </div>
                    

                    <div className='flex flex-col items-center gap-2'>
                        <span className='text-white text-4xl font-semibold'>Choose a password</span>

                        <span className='text-2xl text-gray-500'>Your password mist fulfil the following criteria.</span>
                    </div>
                </div>

                <form onSubmit={submit} className='w-full'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-5'>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password" value="Password" />

                                <InputIconWrapper>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder={'New password'}
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        isFocused={true}
                                        handleChange={(e) => setData('password', e.target.value)}
                                        hasError={!!errors.password}
                                    />
                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOn /> : <EyeOff />}
                                    </div>
                                </InputIconWrapper>

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password_confirmation" value="Confirm Password" />

                                <InputIconWrapper>
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        placeholder={'Confirm password'}
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        handleChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeOn /> : <EyeOff />}
                                    </div>
                                </InputIconWrapper>

                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Button type='submit' size='lg' className='flex justify-center' disabled={processing}>
                                Reset Password
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
