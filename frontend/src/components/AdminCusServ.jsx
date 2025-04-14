import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, Eye, X, Send, Shield } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useAuthStore } from '../store/useAuthStore';

const AdminCusServ = () => {
  const { authUser } = useAuthStore();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all feedback
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/feedback/getAllFeedback', {
          withCredentials: true,
        });
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching feedback:', err.message);
        setError('Failed to fetch feedback. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle status update
  const updateFeedbackStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/feedback/updateFeedback/${id}`,
        { status, adminId: authUser._id }, // Send adminId
        { withCredentials: true }
      );
      setFeedbacks((prev) =>
        prev.map((fb) => (fb._id === id ? response.data.feedback : fb))
      );
    } catch (err) {
      console.error('Error updating feedback status:', err.message);
      alert('Failed to update status.');
    }
  };

  // Handle approve (tick mark)
  const handleApprove = (id) => {
    updateFeedbackStatus(id, 'Approved');
  };

  // Handle review (eye icon)
  const handleReview = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
    if (feedback.status !== 'Approved') {
      updateFeedbackStatus(feedback._id, 'Reviewing');
    }
  };

  // Handle reply via EmailJS
  const handleReply = () => {
    if (!selectedFeedback) return;

    const templateParams = {
      name: selectedFeedback.name,
      title: selectedFeedback.category,
      email: selectedFeedback.email,
      message: `Dear ${selectedFeedback.name},\n\nThank you for your feedback. We have received your message:\n\n"${selectedFeedback.message}"\n\nWe will get back to you shortly.\n\nBest regards,\nCustomer Service Team`,
    };

    emailjs
      .send(
        'service_51t6g2p', // Replace with your EmailJS service ID
        'template_matp20d', // Replace with your EmailJS template ID
        templateParams,
        'LpGEpJqOwCc3mt3qP' // Replace with your EmailJS user ID
      )
      .then(
        () => {
          alert('Reply sent successfully!');
        },
        (error) => {
          console.error('Error sending email:', error);
          alert('Failed to send reply.');
        }
      );
  };

  // Close modal
  const closeModal = () => {
    setSelectedFeedback(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="p-6 text-base-content/70">Loading feedback...</div>;
  }

  if (error) {
    return <div className="p-6 text-error">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-base-200 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-base-content mb-6 flex items-center gap-2">
          <Shield size={28} className="text-primary" /> Customer Service Enquiries
        </h1>
        {feedbacks.length === 0 ? (
          <div className="bg-base-100 rounded-xl p-6 shadow-xl text-base-content/70">
            No feedback available.
          </div>
        ) : (
          <div className="bg-base-100 rounded-xl shadow-xl border border-base-300 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-base-200 text-base-content">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Submitted At</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback._id} className="border-t border-base-300">
                    <td className="p-4">{feedback.name}</td>
                    <td className="p-4">{feedback.email}</td>
                    <td className="p-4 capitalize">
                      {feedback.category.replace(/-/g, ' ')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`badge ${
                          feedback.status === 'Approved'
                            ? 'badge-success'
                            : feedback.status === 'Reviewing'
                            ? 'badge-warning'
                            : 'badge-neutral'
                        }`}
                      >
                        {feedback.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(feedback.submittedAt).toLocaleString()}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        className={`btn btn-ghost btn-sm ${
                          feedback.status === 'Approved' ? 'text-success' : ''
                        }`}
                        onClick={() => handleApprove(feedback._id)}
                        disabled={feedback.status === 'Approved'}
                        title="Approve"
                      >
                        <CheckCircle size={20} />
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleReview(feedback)}
                        title="Review"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-base-100 p-6 rounded-xl shadow-xl w-full max-w-md">
              <h2 className="text-xl font-bold text-base-content mb-4">
                Feedback Details
              </h2>
              <p className="text-sm">
                <strong>Name:</strong> {selectedFeedback.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {selectedFeedback.email}
              </p>
              <p className="text-sm">
                <strong>Category:</strong>{' '}
                {selectedFeedback.category.replace(/-/g, ' ')}
              </p>
              <p className="text-sm">
                <strong>Message:</strong> {selectedFeedback.message}
              </p>
              <p className="text-sm">
                <strong>AWB Code:</strong>{' '}
                {selectedFeedback.awbCode || 'Not provided'}
              </p>
              <p className="text-sm">
                <strong>Status:</strong>{' '}
                <span
                  className={`badge ${
                    selectedFeedback.status === 'Approved'
                      ? 'badge-success'
                      : selectedFeedback.status === 'Reviewing'
                      ? 'badge-warning'
                      : 'badge-neutral'
                  }`}
                >
                  {selectedFeedback.status}
                </span>
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="btn btn-ghost btn-sm flex items-center gap-2"
                  onClick={closeModal}
                >
                  <X size={16} /> Close
                </button>
                <button
                  className="btn btn-primary btn-sm flex items-center gap-2"
                  onClick={handleReply}
                >
                  <Send size={16} /> Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCusServ;