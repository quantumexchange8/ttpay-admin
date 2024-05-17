import React from 'react';

const RadioButtonActive = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white"/>
            <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#5200FF"/>
            <circle cx="12" cy="12" r="8" fill="#5200FF"/>
        </svg>
    );
}

const RadioButton = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="12" fill="white" fillOpacity="0.05"/>
        </svg>
    );
}

export { 
    RadioButtonActive, RadioButton
};