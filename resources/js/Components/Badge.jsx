import React from 'react';

const Admin = () => {
    return (
        <div className='flex md:inline-flex px-2 justify-center items-center border rounded-[100px] border-warning-400'>
            <span className='text-warning-400 text-xss '>Admin</span>
        </div>
    );
}

const Merchant = () => {
    return (
        <div className='flex md:inline-flex px-2 justify-center items-center border rounded-[100px] border-success-400'>
            <span className='text-success-400 text-xss leading-none'>Merchant</span>
        </div>
    );
}

export { Admin, Merchant };