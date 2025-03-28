import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import axios from 'axios';

const CustomerService = () => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('talk');
  const [activeFeedbackTab, setActiveFeedbackTab] = useState('feedback');
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // Fetch authenticated user data to pre-fill name and email
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth/checkAuth', { withCredentials: true });
        const userData = response.data;

        // Populate formData with fullname and email from the authenticated user
        if (userData) {
          setFormData((prevData) => ({
            ...prevData,
            name: userData.fullname || '', // Use fullname from the user
            email: userData.email || '',   // Use email from the user
          }));
        } else {
          console.error('User data not found in response');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Validate required fields
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.message) newErrors.message = 'Message is required.';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/feedback/submitFeedback",
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            category: formData.category,
          },
          { withCredentials: true }
        );
  
        if (response.status === 201) {
          console.log("Feedback submitted successfully:", response.data);
          alert("Feedback submitted successfully!");
          setFormData({
            category: "",
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        }
      } catch (error) {
        console.error("Error submitting feedback:", error.message);
        alert("Failed to submit feedback. Please try again.");
      }
    }
  };

  return (
    <div className={`w-full min-h-screen p-10 bg-${theme}-background text-${theme}-foreground font-montserrat`}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold">
            Help and <span className="italic">support</span>
          </h1>
          <p className="mt-4 text-lg">
            If you've got a question or need support, we're here to help. We’ll do everything we can to help you ship your cargo quickly and securely.
          </p>
          <h2 className="mt-6 text-2xl font-semibold">Get in touch</h2>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-100 p-6 rounded-2xl">
          <div className="flex justify-center space-x-4">
            <button
              className={`p-2 rounded-md ${activeTab === 'talk' ? 'bg-gray-200' : ''}`}
              onClick={() => setActiveTab('talk')}
            >
              Talk to us
            </button>
            <button
              className={`p-2 rounded-md ${activeTab === 'office' ? 'bg-gray-200' : ''}`}
              onClick={() => navigate('/StationCapabilities')}
            >
              Find your closest office
            </button>
          </div>
          {activeTab === 'talk' && (
            <div className="mt-4 text-center">
              <p className="text-sm">
                Our specially trained team is available every day from 07:00 to 19:00 (GST) to answer your questions.
              </p>
              <p className="mt-2 text-blue-500">CargoContact@etihad.ae</p>
              <p>Outside UAE: +971 2 599 0099</p>
              <p>Toll free within UAE: 800 2535</p>
            </div>
          )}
        </section>

        {/* Feedback Section */}
        <section className="bg-gray-100 p-6 rounded-2xl">
          <div className="flex justify-center space-x-4">
            <button
              className={`p-2 rounded-md ${activeFeedbackTab === 'feedback' ? 'bg-gray-200' : ''}`}
              onClick={() => setActiveFeedbackTab('feedback')}
            >
              Feedback
            </button>
          </div>

          {activeFeedbackTab === 'feedback' && (
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <select
                name="category"
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  I'd like to say
                </option>
                <option value="say-well-done">Say well done!</option>
                <option value="share-comment">Share a comment</option>
                <option value="raise-complaint">Raise a complaint</option>
                <option value="something-else">Something else</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

              {/* Name Input */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded-md"
                  placeholder="Your name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="Your email address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Message Input */}
              <textarea
                name="message"
                className="w-full p-2 border rounded-md"
                rows="4"
                placeholder="Your message *"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

              {/* Submit Button */}
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                Submit
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default CustomerService;