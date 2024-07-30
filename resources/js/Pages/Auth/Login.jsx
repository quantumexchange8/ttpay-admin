import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import Label from '@/Components/Label';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import { Head, Link, useForm } from '@inertiajs/react';
import { Switch } from '@headlessui/react'
import { EyeOff, EyeOn } from '@/Components/Icon/Icon';
import ApplicationLogo from '@/Components/ApplicationLogo';
import InputIconWrapPw from '@/Components/InputIconWrapPw';

export default function Login({ status, canResetPassword }) {

    const [enabled, setEnabled] = useState(false);
    const [showPassword, setShowPassword ] = useState(false);

    const toggleRememberMe = () => {
        setEnabled(!enabled);
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        role_id: '',
        password: '',
        remember: enabled,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className='flex flex-col items-center gap-8 px-4 md:px-0'>
                <div className='w-full flex flex-col items-center gap-6'>
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>

                    <div className='flex flex-col items-center gap-2'>
                        <span className='text-white text-4xl font-semibold'>Admin Portal</span>

                        <span className='text-2xl text-gray-500'>Welcome back! Please enter your details.</span>
                    </div>
                </div>

                <form onSubmit={submit} className='w-full'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="role_id" value="ID Number" />

                                <Input
                                    id="role_id"
                                    type="text"
                                    name="role_id"
                                    value={data.id}
                                    className="w-full"
                                    autoComplete="role_id"
                                    isFocused={true}
                                    handleChange={(e) => setData('role_id', e.target.value)}
                                    hasError={!!errors.role_id}
                                />

                                <InputError message={errors.role_id} className="mt-2" />
                            </div>

                            <div className='flex flex-col space-y-1.5'>
                                <Label htmlFor="password" value="Password" />

                                <InputIconWrapPw>
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="w-full"
                                        autoComplete="current-password"
                                        handleChange={(e) => setData('password', e.target.value)}
                                        hasError={!!errors.password}
                                    />
                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOn /> : <EyeOff />}
                                    </div>
                                </InputIconWrapPw>
                                
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </div>
                        

                        <div className="flex justify-between items-center">
                            <div className='flex gap-2'>
                                <Switch
                                    checked={enabled}
                                    onChange={toggleRememberMe}
                                    className={`${enabled ? 'bg-success-500' : 'bg-[#ffffff0d] hover:bg-[#ffffff1a]'}
                                    relative inline-flex h-[20px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                                >
                                    <span
                                    aria-hidden="true"
                                    className={`${enabled ? 'translate-x-3' : 'translate-x-0'}
                                        pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                    />
                                </Switch>

                                <span className="text-white text-sm font-medium">Remember me</span>
                            </div>
                            

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-primary-700 font-semibold hover:text-primary-500"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>

                        <Button size='lg' className='flex justify-center' disabled={processing}>
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
            
        </GuestLayout>
    );
}
