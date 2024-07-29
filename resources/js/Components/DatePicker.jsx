import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 
import './CustomDatepicker.css';
import { useEffect } from "react";

const CustomDatepicker = ({ selectedDate, onChange, placeholder, asSingle }) => { 
    
    const [value, setValue] = useState({ 
        startDate: selectedDate.startDate,
        endDate: selectedDate.endDate
    });

    useEffect(() => {
        // Update value state when selectedDate prop changes
        setValue(selectedDate);
    }, [selectedDate]);

    const handleValueChange = (newValue) => { 
        setValue(newValue); // Update internal state
        onChange(newValue); // Notify parent component
    }

    return (
        <Datepicker 
            primaryColor={"indigo"}
            selected={value}
            placeholder={placeholder}
            useRange={false}
            value={value} 
            onChange={handleValueChange}
            displayFormat={"DD/MM/YYYY"}
            asSingle={asSingle}
            inputClassName="w-full border-none rounded-md py-2.5 px-4 focus:ring-2 focus:ring-primary-800 font-sm text-white bg-[#ffffff0d] dark:placeholder:text-gray-500"
            className="custom-input"
            calendarClassName="custom-calendar"
            showShortcuts={true}
            configs={{
                shortcuts: {
                    yesterday: "Yesterday",
                    today: "Today",
                    currentMonth: "This month",
                    pastMonth: "Last month"
                }
            }}
        />  
    );
}; 

export default CustomDatepicker;