import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const ManageBookings = () => {
  const { authUser } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/bookings?userId=${authUser.id}`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (authUser?.id) {
      fetchBookings();
    }
  }, [authUser]);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto p-4 py-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Manage Your Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-base-300 p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium">{booking.flightNumber}</p>
                <p className="text-sm text-gray-400">
                  Date: {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400">Status: {booking.status}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/profile")}
          className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default ManageBookings;
