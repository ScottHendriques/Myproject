import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, flightId, bookingData } = location.state || {};
  const [loading, setLoading] = useState(false);

  if (!price || !flightId || !bookingData) {
    console.error("Invalid payment details:", { price, flightId, bookingData });
    return (
      <div className="p-6 text-center">
        <p>Invalid payment details. Please try again.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={() => navigate("/booking")}
        >
          Back to Booking
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!price || !flightId) {
      toast.error("Invalid payment details");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/payment/create-payment-intent", {
        amount: price,
        flightId,
      });
      const { clientSecret } = response.data;
      console.log("Navigating to /stripe-payment with:", {
        clientSecret,
        price,
        flightId,
        bookingData,
      });
      navigate("/stripe-payment", {
        state: { clientSecret, price, flightId, bookingData },
      });
    } catch (error) {
      toast.error("Failed to initiate payment");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!price || !flightId) {
    return <p>Invalid payment details. Please try again.</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <p className="mt-4">Flight ID: {flightId}</p>
      <p className="mt-2">Price: EUR {price.toFixed(2)}</p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 disabled:opacity-50"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
    </div>
  );
};

export default PaymentPage;