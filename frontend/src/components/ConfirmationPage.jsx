import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { flightId, price, bookingData } = location.state || {};
  const [isSaving, setIsSaving] = useState(false);
  const hasSaved = useRef(false);

  useEffect(() => {
    const saveBooking = async () => {
      if (hasSaved.current) {
        console.log("Skipping save: already executed");
        return;
      }

      setIsSaving(true);
      console.log("Attempting to save booking...");

      if (!bookingData) {
        console.error("Booking data is missing:", { locationState: location.state });
        toast.error("Booking details are missing. Please try again.");
        navigate("/booking");
        setIsSaving(false);
        return;
      }

      if (!authUser || !authUser._id) {
        console.error("User not authenticated:", { authUser });
        toast.error("Please log in to complete your booking.");
        navigate("/login");
        setIsSaving(false);
        return;
      }

      if (!flightId || !price) {
        console.error("Invalid flight or price data:", { flightId, price });
        toast.error("Invalid flight or payment details.");
        navigate("/booking");
        setIsSaving(false);
        return;
      }

      const payload = {
        shippingFrom: bookingData.shippingFrom,
        shippingTo: bookingData.shippingTo,
        date: bookingData.shippingDate,
        item: bookingData.item,
        totalWeight: bookingData.totalWeight,
        grossWeight: bookingData.grossWeight,
        pieces: bookingData.pieces,
        length: bookingData.length,
        width: bookingData.width,
        height: bookingData.height,
        weight: bookingData.weight,
        user: authUser._id,
        promoCode: bookingData.promoCode,
        finalprice: price, // Use payment price for consistency
        flightId,
      };

      console.log("Saving booking with payload:", payload);

      try {
        const res = await fetch(`http://localhost:5001/api/cargo/${authUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
        }

        hasSaved.current = true;
        toast.success("Booking saved successfully!");
      } catch (error) {
        console.error("Error saving booking:", error);
        toast.error("Failed to save booking. Please contact support.");
      } finally {
        setIsSaving(false);
      }
    };

    saveBooking();
  }, []); // Empty dependency array for single execution

  if (!flightId || !price || !bookingData) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Invalid confirmation details.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          onClick={() => navigate("/booking")}
        >
          Back to Booking
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Payment Confirmed!</h1>
      <p className="mt-4">Thank you for your payment.</p>
      <p className="mt-2">Flight ID: {flightId}</p>
      <p className="mt-2">Amount Paid: EUR {price.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={() => navigate("/")}
        disabled={isSaving}
      >
        {isSaving ? "Saving Booking..." : "Back to Home"}
      </button>
    </div>
  );
};

export default ConfirmationPage;