import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Package, Plane } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios"; 

const Dashboard = () => {
  const { authUser } = useAuthStore();
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState([]);
  const [loadingTopProducts, setLoadingTopProducts] = useState(true);
  const [topDestinations, setTopDestinations] = useState([]);
  const [loadingTopDestinations, setLoadingTopDestinations] = useState(true);
  const [totalBookings, setTotalBookings] = useState(0);
  const [loadingTotalBookings, setLoadingTotalBookings] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentBookings = async () => {
      if (!authUser || !authUser._id) return;

      try {
        const res = await axiosInstance.get(`/recent/${authUser._id}`);
        setRecentBookings(res.data);
      } catch (error) {
        console.error("Error fetching recent bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBookings();
  }, [authUser]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      if (!authUser || !authUser._id) return;

      try {
        const res = await axiosInstance.get(`/top-products/${authUser._id}`);
        setTopProducts(res.data);
      } catch (error) {
        console.error("Error fetching top products:", error);
        setTopProducts([]);
      } finally {
        setLoadingTopProducts(false);
      }
    };

    fetchTopProducts();
  }, [authUser]);

  useEffect(() => {
    const fetchTopDestinations = async () => {
      if (!authUser || !authUser._id) return;

      try {
        const res = await axiosInstance.get(`/top-destinations/${authUser._id}`);
        setTopDestinations(res.data);
      } catch (error) {
        console.error("Error fetching top destinations:", error);
        setTopDestinations([]);
      } finally {
        setLoadingTopDestinations(false);
      }
    };

    fetchTopDestinations();
  }, [authUser]);

  useEffect(() => {
    const fetchTotalBookings = async () => {
      if (!authUser || !authUser._id) return;

      try {
        const res = await axiosInstance.get(`/total-bookings/${authUser._id}`);
        setTotalBookings(res.data.totalBookings);
      } catch (error) {
        console.error("Error fetching total bookings:", error);
      } finally {
        setLoadingTotalBookings(false);
      }
    };

    fetchTotalBookings();
  }, [authUser]);

  return (
    <div className="p-6 min-h-screen grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {/* Booking Count Section */}
      <div className="md:col-span-2 lg:col-span-2 p-4 shadow-md rounded-lg border-2 border-gray-300">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Booking count</h3>
          {loadingTotalBookings ? (
            <p className="text-gray-500 mt-2">Loading...</p>
          ) : (
            <div className="text-center mt-4">
              <p className="text-6xl font-bold text-yellow-600">{totalBookings}</p>
              <p className="text-lg font-medium text-gray-500">Freighters</p>
            </div>
          )}
        </div>
      </div>
  
      {/* Top Product Section */}
      <div className="p-4 shadow-md rounded-lg border-2 border-gray-300">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Top Products</h3>
          {loadingTopProducts ? (
            <p className="text-gray-500 mt-2">Loading...</p>
          ) : topProducts.length > 0 ? (
            <ol className="mt-4 space-y-2">
              {topProducts.map((product, index) => (
                <li key={index} className="p-2 border rounded-lg">
                  <p>
                    <strong>{index + 1}. {product._id}</strong>
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 mt-2">No products found</p>
          )}
        </div>
      </div>
  
      {/* Top Destination Section */}
      <div className="p-4 shadow-md rounded-lg border-2 border-gray-300">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Top destinations</h3>
          {loadingTopDestinations ? (
            <p className="text-gray-500 mt-2">Loading...</p>
          ) : topDestinations.length > 0 ? (
            <ol className="mt-4 space-y-2">
              {topDestinations.map((destination, index) => (
                <li key={index} className="p-2 border rounded-lg">
                  <p>
                    <strong>{index + 1}. {destination._id}</strong>
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 mt-2">No destinations found</p>
          )}
        </div>
      </div>
  
      {/* Tracking Section */}
      <div className="p-4 flex flex-col items-center shadow-md rounded-lg border-2 border-gray-300">
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">Track your flights</h3>
          <div className="flex justify-center my-4">
            <Plane size={40} className="text-gray-500" />
          </div>
          <button className="mt-2 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg">
            <Package className="mr-2" /> Track now
          </button>
        </div>
      </div>
  
      {/* Recent Booking Section */}
      <div className="md:col-span-2 p-4 shadow-md rounded-lg border-2 border-gray-300">
        <div className="p-4">
          <h3 className="text-lg font-semibold">Recent bookings</h3>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/manage-bookings")}
          >
            Manage
          </button>
          {loading ? (
            <p className="text-gray-500 mt-2">Loading...</p>
          ) : recentBookings.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {recentBookings.map((booking) => (
                <li key={booking._id} className="p-2 border rounded-lg">
                  <p>
                    <strong>From:</strong> {booking.shippingFrom} <strong>To:</strong> {booking.shippingTo}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Weight:</strong> {booking.totalWeight} kg
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No recent bookings</p>
          )}
        </div>
      </div>
  
      {/* New Booking Section */}
      <div className="p-4 flex flex-col items-center shadow-md rounded-lg border-2 border-gray-300">
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