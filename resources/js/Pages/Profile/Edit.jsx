import Authenticated from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Head } from '@inertiajs/react';
import Input from '@/Components/Input';
import { useRef } from 'react';
import FileInput from '@/Components/FileInput';

const Profile = ({ userProfile, profile_photo }) => {

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profile_photo', file);

            try {
                const response = await axios.post('/upload-photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                toast.success('Profile photo uploaded!', {
                    title: 'Profile photo uploaded!',
                    duration: 3000,
                    variant: 'variant3',
                });
            } catch (error) {
                console.error('Error uploading profile photo:', error);
                toast.error('Failed to upload profile photo.');
            }
        }
    };

    return (
        <Authenticated header="Profile">
            <Head title="Profile" />
            <div className="flex justify-center bg-[#ffffff0d]">
                <div className="bg-[#ffffff0d] xl:p-[80px] lg:p-[80px] md:p-[80px] px-[20px] py-[40px] rounded-lg shadow-lg text-white w-full ">
                    <div className="hidden md:flex flex-row center items-center gap-[40px] ">
                        <div className='flex flex-col gap-8 w-[320px] px-[61.5px]'>
                            <div className="rounded-full p-8 self-center" style={{ background: 'var(--others-white-bg-5, rgba(255, 255, 255, 0.05))' }}>
                                <div className='flex flex-col w-[91.2px] h-[91.2px]'>
                                <img src={profile_photo ? profile_photo : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="" className="rounded-full w-6 md:w-full h-6 md:h-full"/>
                                </div>
                            </div>
                            <FileInput 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <button 
                                onClick={handleUploadClick}
                                className="flex flex-row items-center gap-2 bg-[#5200FF] text-sm font-semibold text-white py-3 px-4 rounded-lg w-[210px] text-center">
                                    {/* <UploadIcon/> */}
                                    Upload Profile Photo
                            </button>
                        </div>
                        
                        <div className="flex flex-col text-left w-full text-sm font-medium gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="text-gray-400">Name</div>
                                <div className='text-base font-semibold'>{userProfile.name}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-gray-400">User Role</div>
                                <div className='text-base font-semibold'>{userProfile.role}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-gray-400">Email</div>
                                <div className='text-base font-semibold'>{userProfile.email}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col center items-center gap-[40px] md:hidden">
                        <div className='flex flex-col gap-8 w-[320px] items-center'>
                            <div className="rounded-full p-5 self-center" style={{ background: 'var(--others-white-bg-5, rgba(255, 255, 255, 0.05))' }}>
                                <div className='flex flex-col w-[60px] h-[60px]'>
                                    {/* <UserProfileIcon/> */}
                                </div>
                            </div>
                            <button 
                                onClick={handleUploadClick}
                                className="flex flex-row items-center gap-2 bg-[#5200FF] text-sm font-semibold text-white py-3 px-4 rounded-lg w-[210px] text-center">
                                    {/* <UploadIcon/> */}
                                    Upload Profile Photo
                            </button>
                        </div>
                        
                        <div className="flex flex-col text-left w-full text-sm font-medium gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="text-gray-400">Name</div>
                                <div className='text-base font-semibold'>{userProfile.name}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-gray-400">User Role</div>
                                <div className='text-base font-semibold'>{userProfile.role}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-gray-400">Email</div>
                                <div className='text-base font-semibold'>{userProfile.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Profile;