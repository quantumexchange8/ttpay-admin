import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input'

export default function Dashboard({ auth }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Dashboard"
        >
            <Head title="Dashboard" />

            <div>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={data.name}
                    className="block w-full"
                    autoComplete="name"
                    isFocused={true}
                    handleChange={onHandleChange}
                    required
                    cursorColor="#5200FF"
                />
                
            </div>
        </AuthenticatedLayout>
    );
}
