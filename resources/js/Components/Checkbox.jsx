export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-full border-none bg-[#ffffff0d] hover:bg-[#ffffff1a] text-primary-700 hover:text-primary-800 shadow-sm dark:focus:ring-[ffffff0d] focus:border-none' +
                className
            }
        />
    );
}
