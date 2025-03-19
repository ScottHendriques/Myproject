import React from "react";
import { ArrowUp, ArrowDown, Package, Plane } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6  min-h-screen grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-2 lg:col-span-2 p-4 bg-white shadow-md rounded-lg">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Booking count</h3>
          <div className="flex items-center justify-between mt-4">
            <div className="text-gray-500">2024 YTD</div>
            <div className="text-gray-500">2025 YTD</div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white shadow-md rounded-lg">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Top Product</h3>
          <p className="text-gray-500 font-bold mt-2">No data available</p>
        </div>
      </div>
      
      <div className="p-4 bg-white shadow-md rounded-lg">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Top destinations</h3>
          <p className="text-gray-500 font-bold mt-2">No data available</p>
        </div>
      </div>
      
      <div className="p-4 bg-white shadow-md rounded-lg">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Service type</h3>
          <p className="text-gray-500 font-bold mt-2">No data available</p>
        </div>
      </div>
      
      <div className="md:col-span-2 p-4 bg-white shadow-md rounded-lg">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Recent bookings</h3>
          <p className="text-gray-500 font-bold mt-2">No recent bookings</p>
        </div>
      </div>
      
      <div className="p-4 flex flex-col items-center bg-white shadow-md rounded-lg">
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">New booking</h3>
          <div className="flex justify-center my-4">
            <Plane size={40} className="text-gray-500" />
          </div>
          <button className="mt-2 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg">
            <Package className="mr-2" /> Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// use store for handling all the tasks 