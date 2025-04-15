import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useThemeStore } from "@/store/useThemeStore";
import { MapPin, Phone, Mail, Globe, Clock, User, PlusCircle, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StationInput = () => {
  const { theme } = useThemeStore();
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    agent: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    hours: "",
    contacts: [{ name: "", title: "", phone: "", email: "", address: "", website: "", hours: "" }],
  });
  const [error, setError] = useState("");

  const handleInputChange = (e, index = null, field = null) => {
    const { name, value } = e.target;
    if (index !== null && field) {
      const updatedContacts = [...formData.contacts];
      updatedContacts[index][field] = value;
      setFormData({ ...formData, contacts: updatedContacts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        { name: "", title: "", phone: "", email: "", address: "", website: "", hours: "" },
      ],
    });
  };

  const removeContact = (index) => {
    const updatedContacts = formData.contacts.filter((_, i) => i !== index);
    setFormData({ ...formData, contacts: updatedContacts });
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.country) newErrors.push("Country is required.");
    if (!formData.state) newErrors.push("State is required.");
    if (!formData.agent) newErrors.push("Agent is required.");
    if (!formData.location) newErrors.push("Location is required.");
    if (!formData.phone) newErrors.push("Phone is required.");
    if (!formData.email) newErrors.push("Email is required.");
    if (!formData.hours) newErrors.push("Hours are required.");

    formData.contacts.forEach((contact, index) => {
      if (!contact.name) newErrors.push(`Contact ${index + 1}: Name is required.`);
      if (!contact.title) newErrors.push(`Contact ${index + 1}: Title is required.`);
      if (!contact.phone) newErrors.push(`Contact ${index + 1}: Phone is required.`);
      if (!contact.email) newErrors.push(`Contact ${index + 1}: Email is required.`);
      if (!contact.hours) newErrors.push(`Contact ${index + 1}: Hours is required.`);
    });

    setError(newErrors.join(" "));
    return newErrors.length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (!validateForm()) {
      console.log("Validation failed, errors:", error);
      toast.error("Please fill all required fields.");
      return;
    }

    console.log("Validation passed, sending POST request to /stations");
    try {
      const response = await axiosInstance.post("/stations", formData, { withCredentials: true });
      console.log("Server response:", response.data);
      toast.success("Station data saved successfully!");
      console.log("Toast success triggered");
      setFormData({
        country: "",
        state: "",
        agent: "",
        location: "",
        phone: "",
        email: "",
        website: "",
        hours: "",
        contacts: [{ name: "", title: "", phone: "", email: "", address: "", website: "", hours: "" }],
      });
    } catch (err) {
      console.error("Error submitting data:", err.response ? err.response.data : err.message);
      const errorMsg = err.response?.data?.error || "Failed to save data. Please try again.";
      toast.error(errorMsg);
      console.log("Toast error triggered:", errorMsg);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 p-10 min-h-screen bg-base-100 text-base-content">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} className="z-[9999]" />
      <h1 className="text-4xl font-semibold">Add Station Data</h1>
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-2xl space-y-6">
        <div className="form-control">
          <label className="label">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="input input-bordered rounded-2xl w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="input input-bordered rounded-2xl w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Ground Handling Agent</label>
          <input
            type="text"
            name="agent"
            value={formData.agent}
            onChange={handleInputChange}
            className="input input-bordered rounded-2xl w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="input input-bordered rounded-2xl w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input input-bordered rounded-2xl w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input input-bordered rounded-2xl w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Website (optional)</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="input input-bordered rounded-2xl w-full"
            placeholder="e.g., http://example.com"
          />
        </div>

        <div className="form-control">
          <label className="label">Hours</label>
          <input
            type="text"
            name="hours"
            value={formData.hours}
            onChange={handleInputChange}
            className="input input-bordered rounded-2xl w-full"
            required
          />
        </div>

        <h3 className="text-lg font-semibold mt-6">Contacts</h3>
        {formData.contacts.map((contact, index) => (
          <div key={index} className="border rounded-2xl p-4 space-y-4 relative">
            <div className="form-control">
              <label className="label">Name</label>
              <input
                type="text"
                value={contact.name}
                onChange={(e) => handleInputChange(e, index, "name")}
                className="input input-bordered rounded-2xl w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Title</label>
              <input
                type="text"
                value={contact.title}
                onChange={(e) => handleInputChange(e, index, "title")}
                className="input input-bordered rounded-2xl w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Phone</label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => handleInputChange(e, index, "phone")}
                className="input input-bordered rounded-2xl w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => handleInputChange(e, index, "email")}
                className="input input-bordered rounded-2xl w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Address</label>
              <input
                type="text"
                value={contact.address}
                onChange={(e) => handleInputChange(e, index, "address")}
                className="input input-bordered rounded-2xl w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">Website (optional)</label>
              <input
                type="text"
                value={contact.website}
                onChange={(e) => handleInputChange(e, index, "website")}
                className="input input-bordered rounded-2xl w-full"
                placeholder="e.g., http://example.com"
              />
            </div>
            <div className="form-control">
              <label className="label">Hours</label>
              <input
                type="text"
                value={contact.hours}
                onChange={(e) => handleInputChange(e, index, "hours")}
                className="input input-bordered rounded-2xl w-full"
                required
              />
            </div>
            {formData.contacts.length > 1 && (
              <button
                type="button"
                onClick={() => removeContact(index)}
                className="btn btn-error btn-sm absolute top-2 right-2"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addContact} className="btn btn-primary btn-sm mt-4">
          <PlusCircle size={18} /> Add Contact
        </button>

        {error && <p className="text-error mt-4">{error}</p>}

        <button type="submit" className="btn btn-primary w-full mt-6">
          Save Station
        </button>
      </form>
    </div>
  );
};

export default StationInput;