import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ChevronDown, ChevronUp } from "lucide-react";

const ManageBookings = () => {
  const { authUser } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null); // Track which booking is expanded

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
    setExpandedBooking((prev) => (prev === bookingId ? null : bookingId)); // Toggle expanded state
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Manage Your Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <strong>From:</strong> {booking.shippingFrom} <strong>To:</strong> {booking.shippingTo}
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Total Weight:</strong> {booking.totalWeight} kg
                    </p>
                  </div>
                  <button
                    onClick={() => toggleDetails(booking._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedBooking === booking._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedBooking === booking._id && (
                  <div className="mt-4 border-t pt-4 text-sm text-gray-600">
                    <p>
                      <strong>Height:</strong> {booking.height} cm
                    </p>
                    <p>
                      <strong>Width:</strong> {booking.width} cm
                    </p>
                    <p>
                      <strong>Length:</strong> {booking.length} cm
                    </p>
                    <p>
                      <strong>Pieces:</strong> {booking.pieces}
                    </p>
                    <p>
                      <strong>Gross Weight:</strong> {booking.grossWeight} kg
                    </p>
                    <p>
                      <strong>Promo Code:</strong> {booking.promoCode || "N/A"}
                    </p>
                    <p>
                      <strong>Item:</strong> {booking.item}
                    </p>
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