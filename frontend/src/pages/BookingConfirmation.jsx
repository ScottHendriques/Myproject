import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { flightId, price, bookingData, paymentIntentId } = state || {};

  // Enhanced logging to detect state and potential API calls
  useEffect(() => {
    console.log("Confirmation page loaded with state:", {
      flightId,
      price,
      bookingData,
      paymentIntentId,
    });
    if (!state) {
      console.error("No confirmation data available");
    } else {
      console.log("Checking for unintended API calls...", new Error().stack);
    }
  }, [state]);

  // Redirect if no state is available
  if (!state) {
    navigate("/booking");
    return <p>No confirmation data available. Redirecting...</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
      <p className="mt-4">Flight ID: {flightId || "N/A"}</p>
      <p className="mt-2">
        Shipping: {bookingData?.shippingFrom || "N/A"} →{" "}
        {bookingData?.shippingTo || "N/A"}
      </p>
      <p className="mt-2">
        Date: {bookingData?.preferredShippingDate || "N/A"}
      </p>
      <p className="mt-2">
        Item: {bookingData?.item || "N/A"} ({bookingData?.pieces || 0} pieces,{" "}
        {bookingData?.totalWeight || 0} kg)
      </p>
      <p className="mt-2">
        Amount Paid: EUR {price ? price.toFixed(2) : "N/A"}
      </p>
      <p className="mt-2">Payment ID: {paymentIntentId || "N/A"}</p>
      <p className="mt-4">Thank you for your booking!</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default BookingConfirmation;