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
  const [pendingFeedbacks, setPendingFeedbacks] = useState(0);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);
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
    const fetchPendingFeedbacks = async () => {
      if (!authUser || !authUser._id) return;

      try {
        const res = await axiosInstance.get('/api/feedback/getAllFeedback');
        const pendingCount = res.data.filter(
          (fb) => fb.status === 'Pending' || fb.status === 'Reviewing'
        ).length;
        setPendingFeedbacks(pendingCount);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoadingFeedbacks(false);
      }
    };

    fetchPendingFeedbacks();
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
    <div className="min-h-screen bg-base-200 py-20 px-6">
      <header className="sticky top-0 z-10 bg-base-100 rounded-xl shadow-md p-4 mb-6 flex justify-between items-center border border-base-300">
        <div className="flex items-center gap-3">
          <Shield size={28} className="text-primary" />
          <h1 className="text-2xl font-bold text-base-content">Admin Dashboard</h1>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </header>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        <div className="md:col-span-2 lg:col-span-2 bg-base-100 rounded-xl shadow-xl border-t-4 border-primary hover:shadow-lg transition">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-base-content flex items-center gap-2">
              <Gauge size={24} className="text-primary" /> Total Shipments
            </h3>
            {loadingTotalShipments ? (
              <p className="text-base-content/70 mt-4">Loading...</p>
            ) : (
              <div className="text-center mt-6">
                <p className="text-6xl font-bold text-primary">{totalShipments}</p>
                <p className="text-lg font-medium text-base-content/70">Cargo Shipments</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-xl border-t-4 border-warning hover:shadow-lg transition">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-base-content flex items-center gap-2">
              <MessageCircle size={24} className="text-warning" /> Customer Feedback
            </h3>
            {loadingFeedbacks ? (
              <p className="text-base-content/70 mt-4">Loading...</p>
            ) : (
              <div className="text-center mt-6">
                <p className="text-4xl font-bold text-warning">{pendingFeedbacks}</p>
                <p className="text-lg font-medium text-base-content/70">Pending/Reviewing</p>
                <button
                  className="btn btn-primary btn-sm mt-4"
                  onClick={() => navigate('/admin/customer-service')}
                >
                  Review Now
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-xl border-t-4 border-accent hover:shadow-lg transition">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-base-content">Top Cargo Types</h3>
            {loadingCargoTypes ? (
              <p className="text-base-content/70 mt-4">Loading...</p>
            ) : topCargoTypes.length > 0 ? (
              <ol className="mt-4 space-y-3">
                {topCargoTypes.map((cargo, index) => (
                  <li
                    key={index}
                    className="p-3 bg-base-200/50 rounded-lg flex justify-between items-center"
                  >
                    <p className="text-sm font-medium">
                      <strong>{index + 1}. {cargo._id}</strong>
                    </p>
                    <span className="badge badge-primary badge-sm">{cargo.count} shipments</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-base-content/70 mt-4">No cargo types found</p>
            )}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-xl border-t-4 border-accent hover:shadow-lg transition">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-base-content">Top Routes</h3>
            {loadingRoutes ? (
              <p className="text-base-content/70 mt-4">Loading...</p>
            ) : topRoutes.length > 0 ? (
              <ol className="mt-4 space-y-3">
                {topRoutes.map((route, index) => (
                  <li
                    key={index}
                    className="p-3 bg-base-200/50 rounded-lg flex justify-between items-center"
                  >
                    <p className="text-sm font-medium">
                      <strong>{index + 1}. {route._id}</strong>
                    </p>
                    <span className="badge badge-primary badge-sm">{route.count} shipments</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-base-content/70 mt-4">No routes found</p>
            )}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-xl border-t-4 border-warning hover:shadow-lg transition">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-base-content flex items-center gap-2">
              <MessageCircle size={24} className="text-warning" /> Customer Service Enquiries Handled
            </h3>
            {loadingHandledFeedbacks ? (
              <p className="text-base-content/70 mt-4">Loading...</p>
            ) : (
              <div className="text-center mt-6">
                <p className="text-4xl font-bold text-warning">{handledFeedbacks}</p>
                <p className="text-lg font-medium text-base-content/70">Enquiries Handled</p>
                <button
                  className="btn btn-primary btn-sm mt-4"
                  onClick={() => navigate('/admin/customer-service')}
                >
                  View Enquiries
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3 bg-base-100 rounded-xl shadow-xl border-t-4 border-primary hover:shadow-lg transition">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-base-content">Recent Shipments</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/admin/shipments')}
              >
                Manage
              </button>
            </div>
            {loadingShipments ? (
              <p className="text-base-content/70 mt-4">Loading...</p>
            ) : recentShipments.length > 0 ? (
              <div className="space-y-3">
                {recentShipments.map((shipment) => (
                  <div
                    key={shipment._id}
                    className="p-4 bg-base-200/50 rounded-lg flex justify-between items-center"
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
              <p className="text-base-content/70 mt-4">No recent shipments</p>
            )}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-xl border-t-4 border-accent hover:shadow-lg transition">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-base-content mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                onClick={() => navigate('/admin/users')}
              >
                <Users size={18} /> Manage Users
              </button>
              <button
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                onClick={() => navigate('/admin/customer-service')}
              >
                <MessageCircle size={18} /> Customer Service
              </button>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-xl border-t-4 border-warning hover:shadow-lg transition">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-base-content flex items-center gap-2">
              <Package size={24} className="text-warning" /> Pending Actions
            </h3>
            <div className="text-center mt-6">
              <p className="text-4xl font-bold text-warning">3</p>
              <p className="text-lg font-medium text-base-content/70">Awaiting Approval</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;