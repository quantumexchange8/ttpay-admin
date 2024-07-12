import React from 'react';

const Admin = () => {
    return (
        <div className='inline-flex px-2 justify-center items-center border rounded-[100px] border-warning-400'>
            <span className='text-warning-400 text-xss'>Admin</span>
        </div>
    );
}

const Merchant = () => {
    return (
        <div className='inline-flex px-2 justify-center items-center border rounded-[100px] border-success-400'>
            <span className='text-success-400 text-xss'>Merchant</span>
        </div>
    );
}
const Success = () => {
    return (
        <div className='w-[130px] rounded-[50px] py-[2px] px-3 border border-solid bg-[#16A34A1A] border-[#16A34A]'>
            <span className='text-[#22C55E] text-xs font-medium'>Success</span>
        </div>
    );
}
const Pending = () => {
    return (
        <div className='w-[130px] rounded-[50px] py-[2px] px-3 border border-solid bg-[#F59E0B1A] border-[#F59E0B]'>
            <span className='text-[#F59E0B] text-xs font-medium'>Pending</span>
        </div>
    );
}
const Freezing = () => {
    return (
        <div className='w-[130px] rounded-[50px] py-[2px] px-3 border border-solid bg-[#2F72FF1A] border-[#2F72FF]'>
            <span className='text-[#2F72FF] text-xs font-medium'>Freezing</span>
        </div>
    );
}
const Failed = () => {
    return (
        <div className='w-[130px] rounded-[50px] py-[2px] px-3 border border-solid bg-[#dc26261a] border-[#EF4444]'>
            <span className='text-[#EF4444] text-xs font-medium'>Failed</span>
        </div>
    );
}
const Rejected = () => {
    return (
        <div className='w-[130px] rounded-[50px] py-[2px] px-3 border border-solid bg-[#DC26261A] border-[#EF4444]'>
            <span className='text-[#EF4444] text-xs font-medium'>Rejected</span>
        </div>
    );
}

export { Admin, Merchant, Success, Pending, Freezing, Failed, Rejected };