import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { Shield, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ReviewShipments = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBookings = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/admin/all-bookings');
        setBookings(res.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching all bookings:', error.response?.data?.message || error.message);
        setError('Failed to load bookings');
        setBookings([]);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  // Function to safely parse date string and check if it has passed
  const parseDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    return isNaN(date) ? 'Invalid Date' : date < today ? 'Confirmed Delivery' : date.toLocaleDateString();
  };

  // Function to format status for display
  const formatStatus = (status) => {
    if (status?.toLowerCase() === 'confirmed') return 'Payment Confirmed';
    return status || 'Pending';
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      <header className="bg-base-200 rounded-lg p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield size={24} className="text-primary" />
          <h1 className="text-xl font-semibold text-base-content">Manage Bookings</h1>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </header>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-base-content/70">Loading...</p>
        ) : error ? (
          <p className="text-center text-error">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-base-content/70">No bookings found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full bg-base-200 rounded-lg">
              <thead>
                <tr className="bg-base-300">
                  <th className="text-base-content">ID</th>
                  <th className="text-base-content">From</th>
                  <th className="text-base-content">To</th>
                  <th className="text-base-content">Date</th>
                  <th className="text-base-content">Item</th>
                  <th className="text-base-content">Weight (kg)</th>
                  <th className="text-base-content">User</th>
                  <th className="text-base-content">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-base-100">
                    <td className="text-sm text-base-content/70">{booking._id.slice(-6)}</td>
                    <td className="text-sm text-base-content/70">{booking.shippingFrom}</td>
                    <td className="text-sm text-base-content/70">{booking.shippingTo}</td>
                    <td className="text-sm text-base-content/70">
                      {parseDate(booking.preferredShippingDate)}
                    </td>
                    <td className="text-sm text-base-content/70">{booking.item}</td>
                    <td className="text-sm text-base-content/70">{booking.totalWeight}</td>
                    <td className="text-sm text-base-content/70">
                      {booking.user?.fullname || 'Unknown'}
                    </td>
                    <td className="text-sm text-base-content/70">
                      <span
                        className={`badge badge-sm ${
                          booking.status?.toLowerCase() === 'on time'
                            ? 'badge-success'
                            : 'badge-warning'
                        }`}
                      >
                        {formatStatus(booking.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewShipments;