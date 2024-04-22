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
const Menu = ({ color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} className={className} {...rest}>
            <path d="M3 12H21M3 6H21M3 18H15" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
    );
}


const Notification = ({ color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} className={className} {...rest}>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.0012 16.9798C8.96872 16.9798 8.12539 16.1965 8.01039 15.194H11.9912C11.8762 16.1965 11.0329 16.9798 10.0012 16.9798ZM17.0996 15.194L15.5729 11.0873V7.34482C15.5729 4.27148 13.0729 1.77148 10.0004 1.77148C6.92706 1.77148 4.42706 4.27148 4.42706 7.34482V11.0873L2.90039 15.194H6.76039C6.87956 16.8856 8.27956 18.2298 10.0012 18.2298C11.7221 18.2298 13.1221 16.8856 13.2412 15.194H17.0996Z" fill="currentColor"/>
        </svg>
    );
}

const Lang = ({ color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} className={className} {...rest}>
            <path d="M9.99857 1.67773C8.92107 1.67773 7.70608 4.9694 7.55024 9.17773H12.4469C12.2911 4.97023 11.0761 1.67773 9.99857 1.67773ZM7.36856 2.0944C4.29606 3.11857 1.98274 5.92857 1.69107 9.17773H5.88358C5.97608 6.3119 6.49356 3.77023 7.36856 2.0944ZM12.6286 2.0944C13.5036 3.77023 14.0211 6.3119 14.1136 9.17773H18.2802C17.9786 5.89023 15.7311 3.1369 12.6286 2.0944ZM1.71691 10.8444C2.01691 14.1836 4.33523 16.9194 7.3944 17.9277C6.52023 16.2519 5.97608 13.7102 5.88358 10.8444H1.71691ZM7.55024 10.8444C7.70608 15.0519 8.92107 18.3444 9.99857 18.3444C11.0761 18.3444 12.2911 15.0527 12.4469 10.8444H7.55024ZM14.1136 10.8444C14.0211 13.7102 13.4769 16.2519 12.6027 17.9277C15.7452 16.8586 17.9736 14.0777 18.2802 10.8444H14.1136Z" fill="currentColor"/>
        </svg>
    );
}

const Logout = ({ color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} className={className} {...rest}>
            <path fillRule="evenodd" clipRule="evenodd" d="M15.1924 6.38716L14.3108 7.273L16.4224 9.37466H11.2541V10.6247H16.4224L14.3108 12.728L15.1933 13.6138L18.8224 9.99966L15.1924 6.38716Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M6.03778 9.375L11.2541 9.37466L11.2544 1.875H1.65445V18.125H11.2544L11.2541 10.6247L6.03778 10.625V9.375Z" fill="currentColor"/>
        </svg>
    );
}

// ICON
const ArrowUp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 15.5L12 8.5L5 15.5" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
    );
}

const ArrowRight = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8.5 5L15.5 12L8.5 19" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
    );
}

const ArrowDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 8.5L12 15.5L5 8.5" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
    );
}

const ArrowLeft = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15.5 19L8.5 12L15.5 5" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
    );
}

const DArrowUp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 12L12 6L18 12" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
            <path d="M6 18L12 12L18 18" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
    );
}

const DArrowRight = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L12 12L6 18" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
            <path d="M12 6L18 12L12 18" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
    );
}

const DArrowDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L12 12L6 6" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
            <path d="M18 12L12 18L6 12" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
        </svg>
    );
}

const DArrowLeft = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 18L6 12L12 6" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
            <path d="M18 18L12 12L18 6" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
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
    Menu, 
    Notification, 
    Lang, 
    Logout,
    ArrowUp,
    ArrowRight,
    ArrowDown,
    ArrowLeft,
    DArrowUp,
    DArrowRight,
    DArrowDown,
    DArrowLeft,
};