import React, { useEffect, useState } from 'react';
import { Shield, Gauge, Package, Users, LogOut, MessageCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

const DashboardAdmin = () => {
  const { authUser, logout } = useAuthStore();
  const [recentShipments, setRecentShipments] = useState([]);
  const [loadingShipments, setLoadingShipments] = useState(true);
  const [topCargoTypes, setTopCargoTypes] = useState([]);
  const [loadingCargoTypes, setLoadingCargoTypes] = useState(true);
  const [topRoutes, setTopRoutes] = useState([]);
  const [loadingRoutes, setLoadingRoutes] = useState(true);
  const [totalShipments, setTotalShipments] = useState(0);
  const [loadingTotalShipments, setLoadingTotalShipments] = useState(true);
  const [reviewingFeedbacks, setReviewingFeedbacks] = useState(0);
  const [loadingReviewingFeedbacks, setLoadingReviewingFeedbacks] = useState(true);
  const [pendingFeedbacks, setPendingFeedbacks] = useState(0);
  const [loadingPendingFeedbacks, setLoadingPendingFeedbacks] = useState(true);
  const [approvedFeedbacks, setApprovedFeedbacks] = useState(0);
  const [loadingApprovedFeedbacks, setLoadingApprovedFeedbacks] = useState(true);
  const [handledFeedbacks, setHandledFeedbacks] = useState(0);
  const [loadingHandledFeedbacks, setLoadingHandledFeedbacks] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentShipments = async () => {
      if (!authUser || !authUser._id) return;
      try {
        const res = await axiosInstance.get(`/admin/recent`);
        setRecentShipments(res.data);
      } catch (error) {
        console.error('Error fetching recent shipments:', error);
      } finally {
        setLoadingShipments(false);
      }
    };
    fetchRecentShipments();
  }, [authUser]);

  useEffect(() => {
    const fetchTopCargoTypes = async () => {
      if (!authUser || !authUser._id) return;
      try {
        const res = await axiosInstance.get(`/admin/top-cargo`);
        setTopCargoTypes(res.data);
      } catch (error) {
        console.error('Error fetching top cargo types:', error);
        setTopCargoTypes([]);
      } finally {
        setLoadingCargoTypes(false);
      }
    };
    fetchTopCargoTypes();
  }, [authUser]);

  useEffect(() => {
    const fetchTopRoutes = async () => {
      if (!authUser || !authUser._id) return;
      try {
        const res = await axiosInstance.get(`/admin/top-routes`);
        setTopRoutes(res.data);
      } catch (error) {
        console.error('Error fetching top routes:', error);
        setTopRoutes([]);
      } finally {
        setLoadingRoutes(false);
      }
    };
    fetchTopRoutes();
  }, [authUser]);

  useEffect(() => {
    const fetchTotalShipments = async () => {
      if (!authUser || !authUser._id) return;
      try {
        const res = await axiosInstance.get(`/admin/total-shipments`);
        setTotalShipments(res.data.totalShipments);
      } catch (error) {
        console.error('Error fetching total shipments:', error);
      } finally {
        setLoadingTotalShipments(false);
      }
    };
    fetchTotalShipments();
  }, [authUser]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      if (!authUser || !authUser._id) return;
      try {
        const res = await axiosInstance.get('/api/feedback/getAllFeedback');
        const reviewingCount = res.data.filter(
          (fb) => fb.status === 'Pending' || fb.status === 'Reviewing'
        ).length;
        const pendingCount = res.data.filter((fb) => fb.status === 'Pending').length;
        const approvedCount = res.data.filter((fb) => fb.status === 'Approved').length;
        setReviewingFeedbacks(reviewingCount);
        setPendingFeedbacks(pendingCount);
        setApprovedFeedbacks(approvedCount);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoadingReviewingFeedbacks(false);
        setLoadingPendingFeedbacks(false);
        setLoadingApprovedFeedbacks(false);
      }
    };
    fetchFeedbacks();
  }, [authUser]);

  useEffect(() => {
    const fetchHandledFeedbacks = async () => {
      if (!authUser || !authUser._id) return;
      try {
        const res = await axiosInstance.get(`/api/feedback/handled/${authUser._id}`);
        setHandledFeedbacks(res.data.count);
      } catch (error) {
        console.error('Error fetching handled feedbacks:', error);
      } finally {
        setLoadingHandledFeedbacks(false);
      }
    };
    fetchHandledFeedbacks();
  }, [authUser]);

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

        {/* Second Row: Quick Actions, Enquiries Handled */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-base-content mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <button
                className="btn btn-primary btn-sm w-full flex items-center justify-center gap-2"
                onClick={() => navigate('/admin/users')}
              >
                <Users size={16} /> Manage Users
              </button>
              <button
                className="btn btn-primary btn-sm w-full flex items-center justify-center gap-2"
                onClick={() => navigate('/admin/customer-service')}
              >
                <MessageCircle size={16} /> Customer Service
              </button>
            </div>
          </div>

          <div className="bg-base-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-base-content flex items-center gap-2">
              <MessageCircle size={20} className="text-warning" /> Enquiries Handled
            </h3>
            {loadingHandledFeedbacks ? (
              <p className="text-base-content/70 mt-2">Loading...</p>
            ) : (
              <div className="text-center mt-4">
                <p className="text-2xl font-semibold text-warning">{handledFeedbacks}</p>
                <p className="text-base text-base-content/70">Handled by You</p>
                <button
                  className="btn btn-primary btn-sm mt-3"
                  onClick={() => navigate('/admin/customer-service')}
                >
                  View Enquiries
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
                onClick={() => navigate('/admin/shipments')}
              >
                Manage
              </button>
            </div>
            {loadingShipments ? (
              <p className="text-base-content/70">Loading...</p>
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
                        {new Date(shipment.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-base-content/70">
                        <strong>Weight:</strong> {shipment.totalWeight} kg
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