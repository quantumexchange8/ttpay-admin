import React from 'react';

// ICON
const ArrowUp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 15.5L12 8.5L5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const ArrowRight = ({ width, height, color, className, ...rest }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path d="M8.5 5L15.5 12L8.5 19" stroke={color} className={className} {...rest} strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const ArrowDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 8.5L12 15.5L5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const ArrowLeft = ({ width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path d="M15.5 19L8.5 12L15.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const DArrowUp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 12L12 6L18 12" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M6 18L12 12L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const DArrowRight = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L12 12L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M12 6L18 12L12 18" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const DArrowDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L12 12L6 6" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M18 12L12 18L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const DArrowLeft = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 18L6 12L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M18 18L12 12L18 6" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const Calendar = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3.76172 9.59946H20.2489" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M16.1085 13.2108H16.1171" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M12.0046 13.2108H12.0132" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M7.89134 13.2108H7.89991" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M16.1085 16.8065H16.1171" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M12.0046 16.8065H12.0132" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M7.89134 16.8065H7.89991" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M15.7402 2.75V5.79399" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path d="M8.26831 2.75V5.79399" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M20.3251 4.21094H3.67505V21.2503H20.3251V4.21094Z" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
        </svg>
    );
}

const Filter = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.25 2.65625H21.75V7.41703L15 14.3035V19.3456L9 21.6906V14.3035L2.25 7.41703V2.65625ZM3.75 4.15625V6.80448L10.5 13.691V19.4938L13.5 18.3213V13.691L20.25 6.80448V4.15625H3.75Z" fill="white"/>
        </svg>
    );
}

const Edit = ({ width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.1007 1.93945L22.0607 7.8995L8.2098 21.7504L2.25536 21.7448L2.24976 15.7904L16.1007 1.93945ZM3.75034 16.4111L3.75395 20.2462L7.58907 20.2498L19.9394 7.8995L16.1007 4.06077L3.75034 16.4111Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.25495 20.2442L21.0723 20.2448L21.0722 21.7448L2.25536 21.7448L2.25495 20.2442Z" fill="white"/>
        </svg>
    );
}

const Delete = ({ width, height, color, className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.29382 5.70117H20.7056L19.1445 22.0003H4.85488L3.29382 5.70117ZM4.94435 7.20117L6.21808 20.5003H17.7813L19.055 7.20117H4.94435Z" fill={color} className={className}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.05037 2H15.9508L17.4236 6.47529L15.9988 6.94421L14.8653 3.5H9.13586L8.00233 6.94421L6.57751 6.47529L8.05037 2Z" fill={color} className={className}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.751 10.6133L12.751 17.0861L11.251 17.0861L11.251 10.6133L12.751 10.6133Z" fill={color} className={className}/>
        </svg>
    );
}

const EyeOn = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.8456 11.3105C10.5139 11.3105 9.43456 12.3896 9.43456 13.7225C9.43456 15.0543 10.5138 16.1335 11.8456 16.1335C13.1777 16.1335 14.2576 15.054 14.2576 13.7225C14.2576 12.3899 13.1775 11.3105 11.8456 11.3105ZM7.93456 13.7225C7.93456 11.5615 9.6852 9.81055 11.8456 9.81055C14.0056 9.81055 15.7576 11.5612 15.7576 13.7225C15.7576 15.8831 14.0055 17.6335 11.8456 17.6335C9.68535 17.6335 7.93456 15.8828 7.93456 13.7225Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.91923 13.3999C3.97425 9.07394 7.6857 6.36892 11.8447 6.36719H11.8487V7.86719L11.8467 7.86719L11.8447 7.86719M11.8467 7.86719C15.3013 7.86805 18.5533 10.1156 20.4192 14.0436L20.741 14.721L22.0959 14.0774L21.7741 13.3999C19.7191 9.07394 16.0076 6.36892 11.8487 6.36719M11.8467 7.86719C8.39201 7.86805 5.14008 10.1156 3.27412 14.0436L2.95231 14.721L1.59741 14.0774L1.91923 13.3999" fill="white"/>
        </svg>
    );
}

const EyeOff = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.07255 7.72928C4.12757 12.0553 7.83902 14.7603 11.998 14.762H12.002V13.262L12 13.262L11.998 13.262M12 13.262C15.4547 13.2612 18.7066 11.0137 20.5725 7.08565L20.8944 6.4082L22.2493 7.05183L21.9274 7.72928C19.8724 12.0553 16.161 14.7603 12.002 14.762M12 13.262C8.54533 13.2612 5.2934 11.0137 3.42744 7.08565L3.10563 6.4082L1.75073 7.05183L2.07255 7.72928" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5897 10.2154L21.7615 13.3872L20.7008 14.4479L17.5291 11.2761L18.5897 10.2154Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M5.33123 10.2154L2.15947 13.3872L3.22013 14.4479L6.39189 11.2761L5.33123 10.2154Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.8435 12.7547L16.1061 17.1048L14.6656 17.5229L13.4029 13.1728L14.8435 12.7547Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.07668 12.7549L7.81404 17.105L9.25458 17.5231L10.5172 13.173L9.07668 12.7549Z" fill="white"/>
        </svg>
    );
}

const Search = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.9985 3.5C6.97315 3.5 3.70996 6.76319 3.70996 10.7885C3.70996 14.8139 6.97315 18.0771 10.9985 18.0771C15.0238 18.0771 18.287 14.8139 18.287 10.7885C18.287 6.76319 15.0238 3.5 10.9985 3.5ZM2.20996 10.7885C2.20996 5.93476 6.14472 2 10.9985 2C15.8523 2 19.787 5.93476 19.787 10.7885C19.787 15.6423 15.8523 19.5771 10.9985 19.5771C6.14472 19.5771 2.20996 15.6423 2.20996 10.7885Z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.4858 15.6474L22.1013 21.2484L21.0421 22.3104L15.4265 16.7095L16.4858 15.6474Z" fill="white"/>
        </svg>
    );
}



const Alert = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.2461 8.00049V12.4195M12.245 15.5923H12.255M12.25 3C17.358 3 21.5 7.141 21.5 12.25C21.5 17.358 17.358 21.5 12.25 21.5C7.141 21.5 3 17.358 3 12.25C3 7.141 7.141 3 12.25 3Z" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
    );
}

const AddIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V12M12 12V19M12 12H5M12 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
    );
}





// Feature icon
const FeatureSuccessIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_2430_19815)"/>
            <path d="M24 0C10.7676 0 0 10.7664 0 23.9972C0 37.2281 10.7676 48 24 48C37.2324 48 48 37.2336 48 24.0028C48 10.7719 37.2324 0 24 0ZM34.3411 19.4226L22.3383 32.3434C21.7955 32.9304 21.0533 33.2295 20.3056 33.2295C19.663 33.2295 19.0261 33.008 18.4999 32.5649L12.036 27.0266C10.8728 26.0298 10.7399 24.2852 11.7369 23.1222C12.7339 21.9592 14.4787 21.8207 15.6418 22.8231L20.084 26.6279L30.2756 15.6566C31.3169 14.5379 33.0672 14.4714 34.1916 15.5126C35.3159 16.5538 35.3769 18.3039 34.3411 19.4226Z" fill="url(#paint1_linear_2430_19815)"/>
            <defs>
                <linearGradient id="paint0_linear_2430_19815" x1="44.5968" y1="8.66785" x2="-15.2182" y2="0.397062" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="white" stopOpacity="0.61"/>
                </linearGradient>
                <linearGradient id="paint1_linear_2430_19815" x1="48" y1="0" x2="14.1556" y2="39.5827" gradientUnits="userSpaceOnUse">
                <stop stopColor="#B2F763"/>
                <stop offset="1" stopColor="#26AB3F"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

const FeatureErrorIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_2430_19814)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM14.3993 33.5993C13.4353 32.6353 13.4353 31.0724 14.3993 30.1084L20.5075 24.0002L14.3991 17.8918C13.4351 16.9278 13.4351 15.3649 14.3991 14.4009C15.3631 13.4369 16.926 13.4369 17.89 14.4009L23.9984 20.5093L30.1084 14.3993C31.0724 13.4353 32.6353 13.4353 33.5993 14.3993C34.5633 15.3633 34.5633 16.9263 33.5993 17.8902L27.4894 24.0002L33.5991 30.11C34.5631 31.074 34.5631 32.6369 33.5991 33.6009C32.6351 34.5649 31.0722 34.5649 30.1082 33.6009L23.9984 27.4911L17.8902 33.5993C16.9263 34.5633 15.3633 34.5633 14.3993 33.5993Z" fill="url(#paint1_linear_2430_19814)"/>
            <defs>
                <linearGradient id="paint0_linear_2430_19814" x1="44.5968" y1="8.66785" x2="-15.2182" y2="0.397062" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="white" stopOpacity="0.61"/>
                </linearGradient>
                <linearGradient id="paint1_linear_2430_19814" x1="48" y1="0" x2="14.1556" y2="39.5827" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ED5C5C"/>
                <stop offset="1" stopColor="#FF0000"/>
                </linearGradient>
            </defs>
        </svg>
    )
}

const FeatureWarningIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_2430_19813)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM24.0001 30.2458C25.5007 30.2458 26.7171 29.0293 26.7171 27.5287V11.52C26.7171 10.0194 25.5007 8.80297 24.0001 8.80297C22.4995 8.80297 21.2831 10.0194 21.2831 11.52V27.5287C21.2831 29.0293 22.4995 30.2458 24.0001 30.2458ZM23.9808 40.0088C22.3902 40.0088 21.1008 38.7193 21.1008 37.1288C21.1008 35.5382 22.3902 34.2488 23.9808 34.2488H24.0192C25.6098 34.2488 26.8992 35.5382 26.8992 37.1288C26.8992 38.7193 25.6098 40.0088 24.0192 40.0088H23.9808Z" fill="url(#paint1_linear_2430_19813)"/>
            <defs>
                <linearGradient id="paint0_linear_2430_19813" x1="44.5968" y1="8.66785" x2="-15.2182" y2="0.397062" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
                <stop offset="1" stopColor="white" stopOpacity="0.61"/>
                </linearGradient>
                <linearGradient id="paint1_linear_2430_19813" x1="48" y1="0" x2="14.1556" y2="39.5827" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FCD34D"/>
                <stop offset="1" stopColor="#D97706"/>
                </linearGradient>
            </defs>
        </svg>
    )
}

const PlusIcon = ({ color, className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V12M12 12V19M12 12H5M12 12H19" stroke={color} className={className} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
        </svg>
    )
}

const CloseIcon = ({ color, className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke={color} strokeLinecap="square" className={className}/>
        </svg>
    )
}

const SuccessIcon = () => (    
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.6 14.6L15.65 7.55L14.25 6.15L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20Z" fill="#4ADE80"/>
    </svg>
  
    
  );
  
  const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.4 15L10 11.4L13.6 15L15 13.6L11.4 10L15 6.4L13.6 5L10 8.6L6.4 5L5 6.4L8.6 10L5 13.6L6.4 15ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20Z" fill="#EF4444"/>
  </svg>
  
  );
  
  const WarningIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#FBBF24"/>
    </svg>
    
  );

  

export { 
    ArrowUp,
    ArrowRight,
    ArrowDown,
    ArrowLeft,
    DArrowUp,
    DArrowRight,
    DArrowDown,
    DArrowLeft,
    Calendar,
    Filter,
    Edit,
    Delete,
    EyeOn,
    EyeOff,
    Alert,
    Search,
    AddIcon,
    FeatureSuccessIcon,
    FeatureErrorIcon,
    FeatureWarningIcon,
    PlusIcon,
    CloseIcon,
    SuccessIcon,
    ErrorIcon,
    WarningIcon,
};