import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 
import './CustomDatepicker.css';

const CustomDatepicker = ({ selectedDate, onChange }) => { 

    const [value, setValue] = useState({ 
        startDate: null,
        endDate: null 
    });

const handleValueChange = (newValue) => { 
    onChange(newValue); 
}

    return (
        <Datepicker 
            primaryColor={"indigo"}
            selected={selectedDate}
            placeholder="dd/mm/yy-dd/mm/yy"
            useRange={false}
            value={selectedDate} 
            onChange={handleValueChange}
            displayFormat={"DD/MM/YYYY"}
            inputClassName="w-full border-none rounded-md focus:ring-2 focus:ring-primary-800 font-sm text-white bg-[#ffffff0d] dark:placeholder:text-gray-500"
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