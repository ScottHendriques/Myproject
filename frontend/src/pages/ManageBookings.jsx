import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  ChevronDown,
  ChevronUp,
  Ruler,
  Box,
  Weight,
  Tag,
  Package,
} from "lucide-react";

const ManageBookings = () => {
  const { authUser } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!authUser || !authUser._id) return;

      try {
        const response = await fetch(`http://localhost:5001/api/recent/${authUser._id}`);
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [authUser]);

  const toggleDetails = (bookingId) => {
    setExpandedBooking((prev) => (prev === bookingId ? null : bookingId));
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12">
      <div className="max-w-4xl w-full mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-base-content mb-8">
          Manage Your Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-zinc-400 text-lg">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-base-300 p-6 rounded-xl shadow-md border border-base-200"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-yellow-500">
                      <span className="font-semibold">From:</span> {booking.shippingFrom}{" "}
                      <span className="font-semibold">To:</span> {booking.shippingTo}
                    </p>
                    <p className="text-blue-500">
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-base-content">
                      <span className="font-semibold">Total Weight:</span> {booking.totalWeight} kg
                    </p>
                  </div>
                  <button
                    onClick={() => toggleDetails(booking._id)}
                    className="text-blue-600 hover:text-blue-800 transition duration-200 p-2 rounded-full hover:bg-base-200"
                  >
                    {expandedBooking === booking._id ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </button>
                </div>

                {expandedBooking === booking._id && (
                  <div className="mt-4 border-t border-base-200 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Ruler className="w-5 h-5 text-blue-500" />
                        <span>
                          <span className="font-semibold text-base-content">Height:</span>{" "}
                          {booking.height} cm
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-5 h-5 text-blue-500" />
                        <span>
                          <span className="font-semibold text-base-content">Width:</span>{" "}
                          {booking.width} cm
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-5 h-5 text-blue-500" />
                        <span>
                          <span className="font-semibold text-base-content">Length:</span>{" "}
                          {booking.length} cm
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Box className="w-5 h-5 text-blue-500" />
                        <span>
                          <span className="font-semibold text-base-content">Pieces:</span>{" "}
                          {booking.pieces}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Weight className="w-5 h-5 text-blue-500" />
                        <span>
                          <span className="font-semibold text-base-content">Gross Weight:</span>{" "}
                          {booking.grossWeight} kg
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-blue-500" />
                        <span>
                          <span className="font-semibold text-base-content">Promo Code:</span>{" "}
                          {booking.promoCode || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-3">
                        <Package className="w-5 h-5 text-blue-500" />
                        <span>
                          <span className="font-semibold text-base-content">Item:</span>{" "}
                          {booking.item}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;