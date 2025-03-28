import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Eye, X, Send } from "lucide-react"; // Import icons
import emailjs from "emailjs-com"; // Import EmailJS

const AdminCusServ = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null); // State for selected feedback
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [approvedFeedbacks, setApprovedFeedbacks] = useState({}); // Track approved feedbacks
  const [rejectedFeedbacks, setRejectedFeedbacks] = useState({}); // Track rejected feedbacks

  // Fetch all feedback from the backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/feedback/getAllFeedback", {
          withCredentials: true,
        });
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching feedback:", err.message);
        setError("Failed to fetch feedback. Please try again later.");
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleReview = (feedback) => {
    setSelectedFeedback(feedback); // Set the selected feedback
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedFeedback(null); // Clear the selected feedback
    setIsModalOpen(false); // Close the modal
  };

  const handleReply = () => {
    if (!selectedFeedback) return;

    const templateParams = {
      name: selectedFeedback.name,
      title: selectedFeedback.category,
      to_email: selectedFeedback.email,
      message: `Dear ${selectedFeedback.name},\n\nThank you for your feedback. We have received your message:\n\n"${selectedFeedback.message}"\n\nWe will get back to you shortly.\n\nBest regards,\nCustomer Service Team`,
    };

    emailjs
      .send(
        "service_51t6g2p", // Replace with your EmailJS service ID
        "template_matp20d", // Replace with your EmailJS template ID
        templateParams,
        "LpGEpJqOwCc3mt3qP" // Replace with your EmailJS user ID (public key)
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response.status, response.text);
          alert("Reply sent successfully!");
        },
        (error) => {
          console.error("Error sending email:", error);
          alert("Failed to send reply. Please try again.");
        }
      );
  };

  const handleApprove = (id) => {
    setApprovedFeedbacks((prev) => ({ ...prev, [id]: true }));
    setRejectedFeedbacks((prev) => ({ ...prev, [id]: false })); // Ensure rejection is cleared
  };

  const handleReject = (id) => {
    setRejectedFeedbacks((prev) => ({ ...prev, [id]: true }));
    setApprovedFeedbacks((prev) => ({ ...prev, [id]: false })); // Ensure approval is cleared
  };

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Service Enquiries</h1>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Submitted At</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback._id} className="text-center">
                <td className="border border-gray-300 p-2">{feedback.name}</td>
                <td className="border border-gray-300 p-2">{feedback.email}</td>
                <td className="border border-gray-300 p-2">{feedback.category}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(feedback.submittedAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                  {/* Green Tick Button */}
                  <button
                    className={`${
                      approvedFeedbacks[feedback._id]
                        ? "text-green-800"
                        : "text-green-300 opacity-50"
                    } hover:text-green-700 transition-opacity`}
                    onClick={() => handleApprove(feedback._id)}
                  >
                    <CheckCircle size={20} />
                  </button>
                  {/* Red Cancel Button */}
                  <button
                    className={`${
                      rejectedFeedbacks[feedback._id]
                        ? "text-red-700"
                        : "text-red-400 opacity-50"
                    } hover:text-red-700 transition-opacity`}
                    onClick={() => handleReject(feedback._id)}
                  >
                    <XCircle size={20} />
                  </button>
                  {/* Review Button */}
                  <button
                    className="text-blue-500 hover:text-blue-700 transition-opacity opacity-50 hover:opacity-100"
                    onClick={() => handleReview(feedback)}
                  >
                    <Eye size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {isModalOpen && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Feedback Details</h2>
            <p>
              <strong>Name:</strong> {selectedFeedback.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedFeedback.email}
            </p>
            <p>
              <strong>Category:</strong> {selectedFeedback.category}
            </p>
            <p>
              <strong>Message:</strong> {selectedFeedback.message}
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 flex items-center space-x-2"
                onClick={closeModal}
              >
                <X size={16} />
                <span>Close</span>
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
                onClick={handleReply}
              >
                <Send size={16} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCusServ;