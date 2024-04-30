import { useEffect, useRef } from 'react'

export default ({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    withIcon = false,
    placeholder,
    cursorColor,
}) => {
    const input = useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    const baseClasses = `py-2 w-60 border-none hover:bg-[#ffffff1a] rounded-lg bg-[#ffffff0d] focus:border-primary-800 focus:ring focus:ring-primary-800 text-white`

    const inputStyle = {
        caretColor: cursorColor
    };

    return (
        <input
            type={type}
            name={name}
            value={value}
            className={`${baseClasses} ${
                withIcon ? 'pl-11 pr-4' : 'px-4 py-2 text-md'
            } ${className}`}
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
            style={inputStyle}
        />
    )
}