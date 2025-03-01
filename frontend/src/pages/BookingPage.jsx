import React, { useState } from 'react';
import axios from 'axios';

const BookingPage = () => {
    const [formData, setFormData] = useState({
        origin: "",
        destination: "",
        weight: "",
        date: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Booking Data:", formData);

        try {
            // Replace with your backend API route
            const response = await axios.post("http://localhost:5000/api/bookings", formData);
            alert("Booking Confirmed: " + response.data.message);
        } catch (error) {
            console.error("Error booking shipment:", error);
            alert("Booking failed. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Book Your Shipment</h1>
            <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg w-full max-w-md">
                <div className="mb-4">
                    <label className="block font-medium">Origin</label>
                    <input
                        type="text"
                        name="origin"
                        placeholder="Enter Origin"
                        value={formData.origin}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium">Destination</label>
                    <input
                        type="text"
                        name="destination"
                        placeholder="Enter Destination"
                        value={formData.destination}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium">Weight (kg)</label>
                    <input
                        type="number"
                        name="weight"
                        placeholder="Enter weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookingPage;
