import React from "react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col gap-8 sm:justify-center items-center pt-6 sm:pt-0">
            <div className="w-full sm:max-w-[400px]">
                {children}
            </div>
        </div>
    );
}
