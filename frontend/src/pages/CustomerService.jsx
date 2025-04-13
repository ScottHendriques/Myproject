import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore';
import axios from 'axios';

const ContactUs = () => {
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
        if (userData) {
          setFormData((prevData) => ({
            ...prevData,
            name: userData.fullname || '',
            email: userData.email || '',
          }));
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
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.message) newErrors.message = 'Message is required.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:5001/api/feedback/submitFeedback',
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            category: formData.category,
          },
          { withCredentials: true }
        );
        if (response.status === 201) {
          alert('Feedback submitted successfully!');
          setFormData({
            category: '',
            name: '',
            email: '',
            phone: '',
            message: '',
          });
        }
      } catch (error) {
        console.error('Error submitting feedback:', error.message);
        alert('Failed to submit feedback. Please try again.');
      }
    }
  };

  return (
    <div
      className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-${theme}-background text-${theme}-foreground font-montserrat transition-colors duration-300`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-blue-600">Help</span> & Support
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have a question or need assistance? Our team is here to ensure your cargo ships quickly and securely.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'talk'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab('talk')}
            >
              Talk to Us
            </button>
            <button
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeTab === 'office'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => navigate('/Station-Capabilities')}
            >
              Find an Office
            </button>
          </div>
          {activeTab === 'talk' && (
            <div className="text-center space-y-3">
              <p className="text-gray-600 dark:text-gray-300">
                Our team is available daily from <span className="font-semibold">07:00 to 19:00 (GST)</span>.
              </p>
              <a
                href="mailto:CargoContact@etihad.ae"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                CargoContact@etihad.ae
              </a>
              <p className="text-gray-600 dark:text-gray-300">
                Outside UAE: <span className="font-semibold">+971 2 599 0099</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Toll-free in UAE: <span className="font-semibold">800 2535</span>
              </p>
            </div>
          )}
        </section>

        {/* Feedback Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Share Your Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <select
                name="category"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="say-well-done">Say well done!</option>
                <option value="share-comment">Share a comment</option>
                <option value="raise-complaint">Raise a complaint</option>
                <option value="something-else">Something else</option>
              </select>
              {errors.category && <p className="mt-1 text-red-500 text-sm">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Phone (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message *
              </label>
              <textarea
                name="message"
                className="mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-colors"
                rows="5"
                placeholder="Tell us how we can help"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-200"
            >
              Submit Feedback
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;