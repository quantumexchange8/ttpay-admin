import React from 'react';

const Default = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.3333 2.66797V13.3346M11.3333 13.3346L8.66667 10.668M11.3333 13.3346L14 10.668M4.66667 13.3346V2.66797M4.66667 2.66797L2 5.33464M4.66667 2.66797L7.33333 5.33464" stroke="#4B5563" strokeLinecap="square"/>
        </svg>
    );
}

const AscIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 8L7 4V20.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M11.5 19H21.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M11.5 14H19.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M11.5 9H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M11.5 4H15.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const DescIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11.5 4H21.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M3 15.5L7 19.5V3" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M11.5 9H19.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M11.5 14H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M11.5 19H15.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}
export { 
    Default,
    AscIcon,
    DescIcon,
};