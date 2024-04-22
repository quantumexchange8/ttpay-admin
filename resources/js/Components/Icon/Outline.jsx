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

const Dashboard = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2.17285" y="2.82812" width="5.83333" height="5.83333" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
            <rect x="12.1932" y="2.17188" width="5.83333" height="5.83333" transform="rotate(15 12.1932 2.17188)" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
            <rect x="2.17285" y="11.9941" width="5.83333" height="5.83333" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
            <rect x="11.3395" y="11.9941" width="5.83333" height="5.83333" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
        </svg>
    );
}

const Pending = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99996 5V10.8333L6.66663 14.1667" stroke="#D1D5DB" strokeWidth="1.5"/>
            <path d="M9.99996 18.334C8.35178 18.334 6.74062 17.8452 5.37021 16.9296C3.9998 16.0139 2.9317 14.7124 2.30097 13.1897C1.67024 11.667 1.50521 9.99141 1.82675 8.3749C2.1483 6.75839 2.94197 5.27353 4.10741 4.1081C5.27284 2.94266 6.7577 2.14899 8.37421 1.82744C9.99072 1.5059 11.6663 1.67093 13.189 2.30166C14.7117 2.93239 16.0132 4.00049 16.9289 5.3709M16.9289 5.3709L16.6666 0.833984M16.9289 5.3709L12.5 5.00065" stroke="#D1D5DB" strokeWidth="1.5"/>
            <path d="M17.7082 9.95312C17.7083 9.96878 17.7084 9.98445 17.7084 10.0001C17.7084 11.019 17.5107 11.9916 17.1516 12.8819L18.2483 13.5014C18.6898 12.4627 18.9408 11.3235 18.9575 10.1277L17.7082 9.95312Z" fill="#D1D5DB"/>
            <path d="M16.5615 14.0476L17.6507 14.6629C17.1312 15.5136 16.4737 16.2709 15.7094 16.9037L15.0017 15.8657C15.611 15.3455 16.1383 14.7322 16.5615 14.0476Z" fill="#D1D5DB"/>
            <path d="M13.9406 16.6265C13.2011 17.0672 12.3814 17.3877 11.5088 17.5609L11.8498 18.7673C12.854 18.5565 13.7964 18.1774 14.6461 17.661L13.9406 16.6265Z" fill="#D1D5DB"/>
        </svg>
    );
}

const DealHistory = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17.5 2.5H2.5V17.5H17.5L17.5 2.5Z" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
            <path d="M8.75 12.916L10.8333 14.5827L14.1667 10.416" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
            <path d="M5.83337 6.25H14.1667" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
            <path d="M5.83337 9.58398H9.16671" stroke="#D1D5DB" strokeWidth="1.25" strokeLinecap="square"/>
        </svg>
    );
}

const Performance = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5.96977 8.68945V13.7143" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
            <path d="M10.0005 6.28516V13.7144" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
            <path d="M14.0304 11.3457V13.7153" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M17.7083 17.709L17.7083 2.29232L2.29163 2.29232L2.29163 17.709L17.7083 17.709Z" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round"/>
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

export { LineLeft, LineRight, Dashboard, Pending, DealHistory, Performance, ChevronUp, ChevronDown, SubLine, SubLine2, Menu, Notification, Lang, Logout };