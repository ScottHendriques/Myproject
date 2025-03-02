import React, { useState } from "react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { LifeBuoy, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from "lucide-react";

const AdminPage = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarItem 
          icon={<LayoutDashboard size={20} />} 
          text="Dashboard" 
          active={activeItem === "Dashboard"} 
          onClick={() => setActiveItem("Dashboard")} 
        />
        <SidebarItem 
          icon={<UserCircle size={20} />} 
          text="Users" 
          active={activeItem === "Users"} 
          onClick={() => setActiveItem("Users")} 
        />
        <SidebarItem 
          icon={<Boxes size={20} />} 
          text="Inventory" 
          active={activeItem === "Inventory"} 
          onClick={() => setActiveItem("Inventory")} 
        />
        <SidebarItem 
          icon={<BarChart3 size={20} />} 
          text="Statistics" 
          active={activeItem === "Statistics"} 
          onClick={() => setActiveItem("Statistics")} 
        />
        <SidebarItem 
          icon={<Package size={20} />} 
          text="Orders" 
          active={activeItem === "Orders"} 
          onClick={() => setActiveItem("Orders")} 
        />
        <hr className="my-3" />
        <SidebarItem 
          icon={<Settings size={20} />} 
          text="Settings" 
          active={activeItem === "Settings"} 
          onClick={() => setActiveItem("Settings")} 
        />
        <SidebarItem 
          icon={<LifeBuoy size={20} />} 
          text="Help" 
          active={activeItem === "Help"} 
          onClick={() => setActiveItem("Help")} 
        />
      </Sidebar>

      {/* Content Section */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{activeItem}</h1>
      </main>
    </div>
  );
};

export default AdminPage;
