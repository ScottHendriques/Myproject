import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { LifeBuoy, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings } from "lucide-react";

const AdminPage = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigation = (item) => {
    setActiveItem(item);

    // Redirect based on the selected item
    if (item === "Customer Service") {
      navigate("/admin/customer-service"); // Redirect to the customer service page
    }
    // Add more navigation logic for other items if needed
  };

  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Customer Service"
          active={activeItem === "Customer Service"}
          onClick={() => handleNavigation("Customer Service")}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Users"
          active={activeItem === "Users"}
          onClick={() => handleNavigation("Users")}
        />
        <SidebarItem
          icon={<Boxes size={20} />}
          text="Inventory"
          active={activeItem === "Inventory"}
          onClick={() => handleNavigation("Inventory")}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Statistics"
          active={activeItem === "Statistics"}
          onClick={() => handleNavigation("Statistics")}
        />
        <SidebarItem
          icon={<Package size={20} />}
          text="Orders"
          active={activeItem === "Orders"}
          onClick={() => handleNavigation("Orders")}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={activeItem === "Settings"}
          onClick={() => handleNavigation("Settings")}
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          active={activeItem === "Help"}
          onClick={() => handleNavigation("Help")}
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