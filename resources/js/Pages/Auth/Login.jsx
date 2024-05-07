import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import Label from '@/Components/Label';
import PrimaryButton from '@/Components/PrimaryButton';
import Input from '@/Components/Input';
import { Head, Link, useForm } from '@inertiajs/react';
import { Switch } from '@headlessui/react'

export default function Login({ status, canResetPassword }) {

    const [enabled, setEnabled] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
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

            <form onSubmit={submit}>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor="email" value="Email" />

                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={(e) => setData('email', e.target.value)}
                                hasError={!!errors.email}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor="password" value="Password" />

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full"
                                autoComplete="current-password"
                                handleChange={(e) => setData('password', e.target.value)}
                                hasError={!!errors.password}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </div>
                    

                    <div className="flex justify-between items-center">
                        <div className='flex gap-2'>
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
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

                    <div className="flex items-center justify-end mt-4">

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </div>
                
            </form>
        </GuestLayout>
    );
}
