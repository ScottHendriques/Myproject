import React, { useEffect, useState } from 'react';
import { Shield, Gauge, Package, Users, LogOut, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const DashboardAdmin = () => {
  const { authUser, logout } = useAuthStore();
  const [recentShipments, setRecentShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [shipmentsError, setShipmentsError] = useState(null);
  const [topCargoTypes, setTopCargoTypes] = useState([]);
  const [loadingCargoTypes, setLoadingCargoTypes] = useState(true);
  const [cargoError, setCargoError] = useState(null);
  const [topRoutes, setTopRoutes] = useState([]);
  const [loadingRoutes, setLoadingRoutes] = useState(true);
  const [routesError, setRoutesError] = useState(null);
  const [totalShipments, setTotalShipments] = useState(0);
  const [loadingTotalShipments, setLoadingTotalShipments] = useState(true);
  const [totalShipmentsError, setTotalShipmentsError] = useState(null);
  const [reviewingFeedbacks, setReviewingFeedbacks] = useState(0);
  const [loadingReviewingFeedbacks, setLoadingReviewingFeedbacks] = useState(true);
  const [pendingFeedbacks, setPendingFeedbacks] = useState(0);
  const [loadingPendingFeedbacks, setLoadingPendingFeedbacks] = useState(true);
  const [approvedFeedbacks, setApprovedFeedbacks] = useState(0);
  const [loadingApprovedFeedbacks, setLoadingApprovedFeedbacks] = useState(true);
  const [feedbackError, setFeedbackError] = useState(null);
  const navigate = useNavigate();

  const parseDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    return isNaN(date) ? 'Invalid Date' : date < today ? 'Confirmed Delivery' : date.toLocaleDateString();
  };
  
  const formatStatus = (status) => {
    if (status?.toLowerCase() === 'confirmed') return 'Payment Confirmed';
    return status || 'Pending';
  };

  useEffect(() => {
    if (!authUser || !authUser._id) {
      toast.error('Please log in to view the dashboard');
      navigate('/login');
      return;
    }

    if (authUser.role !== 'admin') {
      toast.error('You do not have permission to access this page');
      navigate('/');
      return;
    }

    const fetchRecentShipments = async () => {
      setLoadingShipments(true);
      try {
        const res = await axiosInstance.get('/admin/recent');
        setRecentShipments(res.data);
        setShipmentsError(null);
      } catch (error) {
        console.error('Error fetching recent shipments:', error);
        setShipmentsError('Failed to load recent shipments');
        setRecentShipments([]);
      } finally {
        setLoadingShipments(false);
      }
    };

    const fetchTopCargoTypes = async () => {
      setLoadingCargoTypes(true);
      try {
        const res = await axiosInstance.get('/admin/top-cargo');
        setTopCargoTypes(res.data);
        setCargoError(null);
      } catch (error) {
        console.error('Error fetching top cargo types:', error);
        setCargoError('Failed to load top cargo types');
        setTopCargoTypes([]);
      } finally {
        setLoadingCargoTypes(false);
      }
    };

    const fetchTopRoutes = async () => {
      setLoadingRoutes(true);
      try {
        const res = await axiosInstance.get('/admin/top-routes');
        setTopRoutes(res.data);
        setRoutesError(null);
      } catch (error) {
        console.error('Error fetching top routes:', error);
        setRoutesError('Failed to load top routes');
        setTopRoutes([]);
      } finally {
        setLoadingRoutes(false);
      }
    };

    const fetchTotalShipments = async () => {
      setLoadingTotalShipments(true);
      try {
        const res = await axiosInstance.get('/admin/total-shipments');
        setTotalShipments(res.data.totalShipments);
        setTotalShipmentsError(null);
      } catch (error) {
        console.error('Error fetching total shipments:', error);
        setTotalShipmentsError('Failed to load total shipments');
        setTotalShipments(0);
      } finally {
        setLoadingTotalShipments(false);
      }
    };

    const fetchFeedbackCounts = async () => {
      setLoadingReviewingFeedbacks(true);
      setLoadingPendingFeedbacks(true);
      setLoadingApprovedFeedbacks(true);
      try {
        const pendingRes = await axiosInstance.get('/feedback/pending');
        const approvedRes = await axiosInstance.get('/feedback/approved');
        const reviewingRes = await axiosInstance.get('/feedback/getAllFeedback');
        const reviewingCount = reviewingRes.data.filter(
          (fb) => fb.status === 'Pending' || fb.status === 'Reviewing'
        ).length;
        setPendingFeedbacks(pendingRes.data.count);
        setApprovedFeedbacks(approvedRes.data.count);
        setReviewingFeedbacks(reviewingCount);
        setFeedbackError(null);
      } catch (error) {
        console.error('Error fetching feedback counts:', error);
        setFeedbackError('Failed to load feedback data');
        setPendingFeedbacks(0);
        setApprovedFeedbacks(0);
        setReviewingFeedbacks(0);
      } finally {
        setLoadingReviewingFeedbacks(false);
        setLoadingPendingFeedbacks(false);
        setLoadingApprovedFeedbacks(false);
      }
    };

    fetchRecentShipments();
    fetchTopCargoTypes();
    fetchTopRoutes();
    fetchTotalShipments();
    fetchFeedbackCounts();
  }, [authUser, navigate]);

  return (
    <div className="min-h-screen bg-base-100 py-12 px-6">
      <header className="bg-base-200 rounded-lg p-4 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield size={24} className="text-primary" />
          <h1 className="text-xl font-semibold text-base-content">Admin Dashboard</h1>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* First Row: Customer Feedback, Pending Feedback, Approved Feedback */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-base-content flex items-center gap-2">
              <MessageCircle size={20} className="text-warning" /> Customer Feedback
            </h3>
            {loadingReviewingFeedbacks ? (
              <p className="text-base-content/70 mt-2">Loading...</p>
            ) : feedbackError ? (
              <p className="text-error mt-2">{feedbackError}</p>
            ) : (
              <div className="text-center mt-4">
                <p className="text-2xl font-semibold text-warning">{reviewingFeedbacks}</p>
                <p className="text-base text-base-content/70">Reviewing</p>
                <button
                  className="btn btn-primary btn-sm mt-3"
                  onClick={() => navigate('/admin/customer-service')}
                >
                  Review Now
                </button>
              </div>
            )}
          </div>

          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-base-content flex items-center gap-2">
              <MessageCircle size={20} className="text-warning" /> Pending Feedback
            </h3>
            {loadingPendingFeedbacks ? (
              <p className="text-base-content/70 mt-2">Loading...</p>
            ) : feedbackError ? (
              <p className="text-error mt-2">{feedbackError}</p>
            ) : (
              <div className="text-center mt-4">
                <p className="text-2xl font-semibold text-warning">{pendingFeedbacks}</p>
                <p className="text-base text-base-content/70">Pending</p>
                <button
                  className="btn btn-primary btn-sm mt-3"
                  onClick={() => navigate('/admin/customer-service')}
                >
                  View Pending
                </button>
              </div>
            )}
          </div>

          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-base-content flex items-center gap-2">
              <MessageCircle size={20} className="text-success" /> Approved Feedback
            </h3>
            {loadingApprovedFeedbacks ? (
              <p className="text-base-content/70 mt-2">Loading...</p>
            ) : feedbackError ? (
              <p className="text-error mt-2">{feedbackError}</p>
            ) : (
              <div className="text-center mt-4">
                <p className="text-2xl font-semibold text-success">{approvedFeedbacks}</p>
                <p className="text-base text-base-content/70">Approved</p>
                <button
                  className="btn btn-primary btn-sm mt-3"
                  onClick={() => navigate('/admin/customer-service')}
                >
                  View Approved
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Third Row: Total Shipments, Top Cargo Types, Top Routes */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-base-content flex items-center gap-2">
              <Gauge size={20} className="text-primary" /> Total Shipments
            </h3>
            {loadingTotalShipments ? (
              <p className="text-base-content/70 mt-2">Loading...</p>
            ) : totalShipmentsError ? (
              <p className="text-error mt-2">{totalShipmentsError}</p>
            ) : (
              <div className="text-center mt-4">
                <p className="text-2xl font-semibold text-primary">{totalShipments}</p>
                <p className="text-base text-base-content/70">Cargo Shipments</p>
              </div>
            )}
          </div>

          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-base-content">Top Cargo Types</h3>
            {loadingCargoTypes ? (
              <p className="text-base-content/70 mt-2">Loading...</p>
            ) : cargoError ? (
              <p className="text-error mt-2">{cargoError}</p>
            ) : topCargoTypes.length > 0 ? (
              <ol className="mt-3 space-y-2">
                {topCargoTypes.map((cargo, index) => (
                  <li
                    key={index}
                    className="p-2 bg-base-100 rounded-md flex justify-between items-center"
                  >
                    <p className="text-sm font-medium">
                      {index + 1}. {cargo._id}
                    </p>
                    <span className="badge badge-primary badge-sm">{cargo.count}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-base-content/70 mt-2">No cargo types found</p>
            )}
          </div>

          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-base-content">Top Routes</h3>
            {loadingRoutes ? (
              <p className="text-base-content/70 mt-2">Loading...</p>
            ) : routesError ? (
              <p className="text-error mt-2">{routesError}</p>
            ) : topRoutes.length > 0 ? (
              <ol className="mt-3 space-y-2">
                {topRoutes.map((route, index) => (
                  <li
                    key={index}
                    className="p-2 bg-base-100 rounded-md flex justify-between items-center"
                  >
                    <p className="text-sm font-medium">
                      {index + 1}. {route._id}
                    </p>
                    <span className="badge badge-primary badge-sm">{route.count}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-base-content/70 mt-2">No routes found</p>
            )}
          </div>
        </div>

        {/* Fourth Row: Recent Shipments */}
        <div className="grid gap-6 grid-cols-1">
          <div className="bg-base-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-base-content">Recent Shipments</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/admin/ReviewShipments')}
              >
                Manage
              </button>
            </div>
            {loadingShipments ? (
              <p className="text-base-content/70">Loading...</p>
            ) : shipmentsError ? (
              <p className="text-error">{shipmentsError}</p>
            ) : recentShipments.length > 0 ? (
              <div className="space-y-2">
                {recentShipments.map((shipment) => (
                  <div
                    key={shipment._id}
                    className="p-3 bg-base-100 rounded-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        <strong>From:</strong> {shipment.shippingFrom}{' '}
                        <strong>To:</strong> {shipment.shippingTo}
                      </p>
                      <p className="text-sm text-base-content/70">
                        <strong>Date:</strong>{' '}
                        {new Date(shipment.preferredShippingDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-base-content/70">
                        <strong>Weight:</strong> {shipment.totalWeight} kg
                      </p>
                      <p className="text-sm text-base-content/70">
                        <strong>User:</strong> {shipment.user?.fullname || 'Unknown'}
                      </p>
                    </div>
                    <span
                      className={`badge badge-sm ${
                        shipment.status?.toLowerCase() === 'on time'
                          ? 'badge-success'
                          : 'badge-warning'
                      }`}
                    >
                      {shipment.status || 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base-content/70">No recent shipments</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;