import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 
import './CustomDatepicker.css';
import { useEffect } from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";

const CustomMonthpicker = ({ selectedMonth, onChange, placeholder, asSingle }) => { 
    
    const [value, setValue] = useState(selectedMonth);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        // Convert newValue to start and end of the month
        if (newValue && newValue.startDate) {
            const startDate = startOfMonth(newValue.startDate);
            const endDate = endOfMonth(newValue.startDate);
            onChange({ startDate, endDate });
        }
    };

    return (
        <Datepicker 
            primaryColor={"indigo"}
            selected={value}
            placeholder={placeholder}
            useRange={false}
            value={value} 
            onChange={handleValueChange}
            displayFormat={"YYYY/MM"}
            asSingle={asSingle}
            inputClassName="w-full border-none rounded-md focus:ring-2 focus:ring-primary-800 font-sm text-white bg-[#ffffff0d] dark:placeholder:text-gray-500"
            className="custom-input"
            calendarClassName="custom-calendar"
            showShortcuts={false}
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

export default CustomMonthpicker;