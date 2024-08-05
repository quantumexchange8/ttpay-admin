import React, { useContext, createContext, useState  } from "react";
import { Admin, Merchant } from '@/Components/Badge';
import { LineLeft, LineRight, ChevronDown, ChevronUp, XIcon } from '@/Components/Icon/Outline';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from "react";

const SidebarContext = createContext()

export default function Sidebar({ children, expanded, toggleSidebar }) {
  
  const { auth } = usePage().props;
  const { url } = usePage();
  const [mediaUrl, setMediaUrl] = useState(null);
  
  useEffect(() => {
    // Fetch media URL from API
    const fetchMediaUrl = async () => {
        try {
            const response = await axios.get('/user/media');
            setMediaUrl(response.data.mediaUrl);
        } catch (error) {
            console.error('Failed to fetch media URL:', error);
        }
    };

    fetchMediaUrl();
}, []);

  return (
    <aside className={`fixed inset-y-0 z-40 border-r border-transparent md:border-[#1F2937] overflow-auto backdrop-blur-2xl md:bg-[#ffffff0d]
      scrollbar-thin scrollbar-webkit
      ${!expanded ? 'translate-x-0 w-0' : ' w-auto lg:w-[281px]'}`}
    >
      <nav className="w-full h-full md:h-auto py-5 px-3 md:p-5 flex flex-col gap-5 ">
        <div className="flex items-center gap-3">
          <Link href={route('profile')} className={`${
                url === '/profile' ? 'bg-[#03071299] rounded-lg w-full' : ''
          }`}>
            <div className="w-60 md:w-full py-3 px-4 flex justify-between items-center gap-3 hover:bg-[#03071299] rounded-lg">
                <div className="flex items-center gap-3" >
                  <img src={mediaUrl ? mediaUrl : "https://img.freepik.com/free-icon/user_318-159711.jpg"} alt="" className="rounded-full w-6 md:w-10 h-6 md:h-10"/>
                  <div className="flex flex-col ">
                    <div className="text-white text-sm">
                        {auth.user.name}
                    </div>
                    <div className="flex gap-3 text-white text-xs">
                        <div>ID: {auth.user.role_id}</div>
                        {
                          auth.user.role === 'admin' ? <Admin/> : <Merchant/>
                        }
                    </div>
                  </div>
                </div>
            </div>
          </Link>
          <div className='block lg:hidden cursor-pointer'>
            <XIcon onClick={toggleSidebar}/>
          </div>
        </div>
        
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex flex-col gap-5">{children}</ul>
        </SidebarContext.Provider>

      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, pending }) {
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
        className={`overflow-hidden transition-all text-sm font-medium flex justify-between ${
          expanded ? "w-44" : "w-0"
        }`}
      >
        {text} {pending >= 1 ? <div className="w-5 h-5 flex items-center justify-center rounded-full bg-error-700 text-xss text-white">{pending}</div> : null}
      </span>
    </li>
  )
}

export function SidebarCollapsible({ text, children, icon, active }) {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpanded = () => {
      setExpanded(!expanded);
    };
  
    return (
      <li>
        <button className={`py-[10px] px-4 text-white hover:bg-[#03071299] rounded-md flex gap-3 items-center w-full`} onClick={toggleExpanded}>
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
              ? "text-white"
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