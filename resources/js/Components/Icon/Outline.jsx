import React from 'react';

const LineLeft = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="83" height="2" viewBox="0 0 83 2" fill="none">
            <path d="M83 1C83 0.723858 82.7761 0.5 82.5 0.5H0V1.5H82.5C82.7761 1.5 83 1.27614 83 1Z" fill="url(#paint0_linear_2033_471)"/>
            <defs>
                <linearGradient id="paint0_linear_2033_471" x1="83" y1="1" x2="0" y2="1" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9CA3AF"/>
                <stop offset="1" stopColor="#4B5563" stopOpacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

const LineRight = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="83" height="2" viewBox="0 0 83 2" fill="none">
            <path d="M0 1C0 0.723858 0.223858 0.5 0.5 0.5H83V1.5H0.500002C0.22386 1.5 0 1.27614 0 1Z" fill="url(#paint0_linear_2033_473)"/>
            <defs>
                <linearGradient id="paint0_linear_2033_473" x1="0" y1="1" x2="83" y2="1" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9CA3AF"/>
                <stop offset="1" stopColor="#4B5563" stopOpacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

const ChevronUp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4.16683 12.918L10.0002 7.08464L15.8335 12.918" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
        </svg>
    );
}

const ChevronDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15.8332 7.08203L9.99984 12.9154L4.1665 7.08203" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
        </svg>
    );
}

const SubLine = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path d="M1 0V20H21" stroke="#4B5563"/>
        </svg>
    );
}

const SubLine2 = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="31" viewBox="0 0 21 31" fill="none">
            <path d="M1 0V30H21" stroke="#4B5563"/>
        </svg>
    );
}

// TOPBAR ICON
const MenuIcon = ({ color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} className={className} {...rest}>
            <path d="M3 12H21M3 6H21M3 18H15" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
    );
}


const Notification = ({ color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} {...rest}>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.0012 16.9798C8.96872 16.9798 8.12539 16.1965 8.01039 15.194H11.9912C11.8762 16.1965 11.0329 16.9798 10.0012 16.9798ZM17.0996 15.194L15.5729 11.0873V7.34482C15.5729 4.27148 13.0729 1.77148 10.0004 1.77148C6.92706 1.77148 4.42706 4.27148 4.42706 7.34482V11.0873L2.90039 15.194H6.76039C6.87956 16.8856 8.27956 18.2298 10.0012 18.2298C11.7221 18.2298 13.1221 16.8856 13.2412 15.194H17.0996Z" fill="currentColor"/>
        </svg>
    );
}

const Lang = ({ color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} {...rest}>
            <path d="M9.99857 1.67773C8.92107 1.67773 7.70608 4.9694 7.55024 9.17773H12.4469C12.2911 4.97023 11.0761 1.67773 9.99857 1.67773ZM7.36856 2.0944C4.29606 3.11857 1.98274 5.92857 1.69107 9.17773H5.88358C5.97608 6.3119 6.49356 3.77023 7.36856 2.0944ZM12.6286 2.0944C13.5036 3.77023 14.0211 6.3119 14.1136 9.17773H18.2802C17.9786 5.89023 15.7311 3.1369 12.6286 2.0944ZM1.71691 10.8444C2.01691 14.1836 4.33523 16.9194 7.3944 17.9277C6.52023 16.2519 5.97608 13.7102 5.88358 10.8444H1.71691ZM7.55024 10.8444C7.70608 15.0519 8.92107 18.3444 9.99857 18.3444C11.0761 18.3444 12.2911 15.0527 12.4469 10.8444H7.55024ZM14.1136 10.8444C14.0211 13.7102 13.4769 16.2519 12.6027 17.9277C15.7452 16.8586 17.9736 14.0777 18.2802 10.8444H14.1136Z" fill="currentColor"/>
        </svg>
    );
}

const Logout = ({ color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} {...rest}>
            <path fillRule="evenodd" clipRule="evenodd" d="M15.1924 6.38716L14.3108 7.273L16.4224 9.37466H11.2541V10.6247H16.4224L14.3108 12.728L15.1933 13.6138L18.8224 9.99966L15.1924 6.38716Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.03778 9.375L11.2541 9.37466L11.2544 1.875H1.65445V18.125H11.2544L11.2541 10.6247L6.03778 10.625V9.375Z" fill="currentColor"/>
        </svg>
    );
}

const XIcon = ({...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" {...rest}>
            <path d="M15.7998 5L5.7998 15M5.7998 5L15.7998 15" stroke="#9CA3AF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const DotVerticalIcon = ({...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...rest}>
            <path d="M9.99999 10.834C10.4602 10.834 10.8333 10.4609 10.8333 10.0007C10.8333 9.54041 10.4602 9.16732 9.99999 9.16732C9.53975 9.16732 9.16666 9.54041 9.16666 10.0007C9.16666 10.4609 9.53975 10.834 9.99999 10.834Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.99999 5.00065C10.4602 5.00065 10.8333 4.62755 10.8333 4.16732C10.8333 3.70708 10.4602 3.33398 9.99999 3.33398C9.53975 3.33398 9.16666 3.70708 9.16666 4.16732C9.16666 4.62755 9.53975 5.00065 9.99999 5.00065Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.99999 16.6673C10.4602 16.6673 10.8333 16.2942 10.8333 15.834C10.8333 15.3737 10.4602 15.0007 9.99999 15.0007C9.53975 15.0007 9.16666 15.3737 9.16666 15.834C9.16666 16.2942 9.53975 16.6673 9.99999 16.6673Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export { 
    LineLeft, 
    LineRight, 
    ChevronUp, 
    ChevronDown, 
    SubLine, 
    SubLine2, 
    MenuIcon, 
    Notification, 
    Lang, 
    Logout,
    XIcon,
    DotVerticalIcon,
};