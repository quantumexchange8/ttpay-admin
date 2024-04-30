import React, { useContext, createContext, useState  } from "react";
import { Admin, Merchant } from '@/Components/Badge';
import { LineLeft, LineRight, ChevronDown, ChevronUp } from '@/Components/Icon/Outline';
import { Link, usePage } from '@inertiajs/react';

const SidebarContext = createContext()

export default function Sidebar({ children, expanded, toggleSidebar }) {
  
  const { auth } = usePage().props;

  return (
    <aside className={`fixed inset-y-0 z-20 border-r border-[#1F2937] overflow-auto
      scrollbar-thin scrollbar-webkit
      ${!expanded ? 'w-0' : 'w-0 lg:w-[285px]'}`}
    >
      <nav className="w-full h-auto p-5 flex flex-col gap-5 bg-[#ffffff0d]">
        <div className="py-3 px-4 flex justify-start items-center gap-3 hover:bg-[#03071299] rounded-lg">
            <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="" className="rounded-full w-10 h-10"/>
          <div className="flex flex-col ">
            <div className="text-white">
                {auth.user.name}
            </div>
            <div className="flex gap-3 text-white text-xs">
                <div>ID: AID000001</div>
                <Admin/>
            </div>
          </div>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex flex-col gap-5">{children}</ul>
        </SidebarContext.Provider>

      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <li
      className={`
        flex items-center gap-3 py-[10px] px-4
        font-medium rounded-md cursor-pointer
        transition-colors group
        text-left
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-[#03071299] text-gray-300"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all text-sm font-medium ${
          expanded ? "w-44" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  )
}

export function SidebarCollapsible({ text, children, icon }) {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpanded = () => {
      setExpanded(!expanded);
    };
  
    return (
      <li>
        <button className="py-[10px] px-4 text-white flex gap-3 items-center w-full" onClick={toggleExpanded}>
            {icon}
            <span className="w-36 text-left text-sm font-medium">{text}</span>
            
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
  
        {expanded && (
          <ul className="ml-5">
            {children}
          </ul>
        )}
      </li>
    );
  }

export function SidebarCollapseItem({ icon, text, active, alert }) {
const { expanded } = useContext(SidebarContext)

return (
    <li
    className={`
        flex items-center
        font-medium rounded-md cursor-pointer pt-[9px] pr-4
        transition-colors
        ${
        active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-[#03071299] text-gray-300"
        }
    `}
    >
    {icon}
    <span
        className={`overflow-hidden transition-all ${
        expanded ? "w-44" : "w-0"
        }`}
    >
        {text}
    </span>
    {alert && (
        <div
        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
        }`}
        />
    )}

    {!expanded && (
        <div
        className={`
        absolute left-full rounded-md px-2 py-1 text-xs
        invisible opacity-20 -translate-x-3 transition-all
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
    `}
        >
        {text}
        </div>
    )}
    </li>
)
}

export function SectionLabel({ text }) {
    return (
      <div className='flex items-center gap-1'>
        <LineLeft />
            <span className='text-xs font-medium text-gray-300'>{text}</span>
        <LineRight />
      </div>
    );
  }