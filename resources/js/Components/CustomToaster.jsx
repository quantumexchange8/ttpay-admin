import React from "react";
import { Transition } from "@headlessui/react";
import { toast, Toaster, resolveValue } from 'react-hot-toast';

const CustomToaster = () => {
  return (
    <Toaster position="top-center">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className={getClassNames(t)}
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
            <span className="flex items-center justify-center bg-[#ffffff0d] w-9 h-8 rounded-full">
                {getIcon(t)}
            </span>
            <div className="flex flex-col w-full">
              <p className="w-full">{resolveValue(t.message)}</p>
              <span className="max-w-[510px] w-full text-gray-300 text-sm">{resolveValue(t.description)}</span>
            </div>
            
            <button onClick={() => toast.dismiss(t.id)}>
                <span className="text-gray-400 hover:text-white">x</span>
            </button>
        </Transition>
      )}
    </Toaster>
  );
};

const getClassNames = (toast) => {
  // Determine class names based on toast variant
  switch (toast.type) {
    case 'success':
      return "transform py-3 px-4 flex bg-[#111827] rounded shadow-lg text-white text-sm font-Semibold flex items-center justify-center gap-3 w-[680px]";
    case 'error':
      return "transform p-4 flex bg-[#111827] rounded shadow-md text-white text-sm font-Semibold flex items-center gap-3 w-[680px]";
    case 'warning':
      return "transform p-4 flex bg-yellow-200 rounded shadow-lg flex items-center gap-3 w-[680px]";
    default:
      return "transform p-4 flex bg-white rounded shadow-lg flex items-center gap-3 w-[680px]";
  }
};

const getIcon = (toast) => {
  // Determine icon based on toast variant
  switch (toast.type) {
    case 'success':
      return <SuccessIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningIcon />;
    default:
      return null; // No icon for default variant
  }
};

const SuccessIcon = () => (
//   <svg className="h-6 w-6 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//   </svg>
    
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
  <svg className="h-6 w-6 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v8m0 4v.01M12 20v.01" />
  </svg>
);

export { CustomToaster };
