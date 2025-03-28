import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const location = useLocation();
  const { price, flightId } = location.state || {};
  console.log("Payment details:", location.state);

  const handlePayment = async () => {
    try {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem("authToken");

      // Make the POST request to the backend
      const response = await axios.post(
        "http://localhost:5001/api/cargo/create-payment-session",
        {
          price,
          flightId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      // Redirect to Stripe Checkout if the session URL is returned
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast("Failed to initiate payment session");
      }
    } catch (error) {
      console.error("Error initiating payment session:", error);
      toast("An error occurred while processing the payment.");
    }
  };

  // Handle invalid payment details
  if (!price || !flightId) {
    return <p>Invalid payment details. Please try again.</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <p className="mt-4">Flight ID: {flightId}</p>
      <p className="mt-2">Price: EUR {price.toFixed(2)}</p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={handlePayment}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default PaymentPage;