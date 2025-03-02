import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  console.log("Sidebar Rendered"); // Debugging

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className="h-screen bg-white border-r shadow-sm transition-all duration-300 ease-in-out">
        <nav className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`transition-all ${expanded ? "w-32" : "w-0 opacity-0"}`}
              alt="Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          {/* Sidebar Items */}
          <ul className="flex-1 px-3">{children}</ul>

          {/* User Info */}
          <div className="border-t flex p-3 items-center">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt="User Avatar"
              className="w-10 h-10 rounded-md"
            />
            {expanded && (
              <div className="ml-3">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
            )}
            <MoreVertical size={20} className="ml-auto" />
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({ icon, text, active, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`flex items-center py-2 px-3 my-1 rounded-md cursor-pointer group transition-colors 
        ${active ? "bg-indigo-200 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
      `}
      onClick={onClick}
    >
      {icon}
      <span className={`ml-3 transition-all ${expanded ? "block" : "hidden"}`}>{text}</span>
    </li>
  );
}
