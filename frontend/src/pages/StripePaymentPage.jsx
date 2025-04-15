import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ clientSecret, price, flightId, bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message);
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        try {
          console.log("Sending booking request to /bookings with:", {
            userId: bookingData.userId,
            shippingFrom: bookingData.shippingFrom,
            shippingTo: bookingData.shippingTo,
            preferredShippingDate: bookingData.preferredShippingDate,
            apiDate: bookingData.apiDate,
            item: bookingData.item,
            totalWeight: bookingData.totalWeight,
            grossWeight: bookingData.grossWeight,
            pieces: bookingData.pieces,
            length: bookingData.length,
            width: bookingData.width,
            height: bookingData.height,
            weight: bookingData.weight,
            promoCode: bookingData.promoCode,
            finalPrice: price,
            flightId: flightId,
            paymentIntentId: paymentIntent.id,
          });

          const bookingResponse = await axiosInstance.post("/bookings", {
            userId: bookingData.userId,
            shippingFrom: bookingData.shippingFrom,
            shippingTo: bookingData.shippingTo,
            preferredShippingDate: bookingData.preferredShippingDate,
            apiDate: bookingData.apiDate,
            item: bookingData.item,
            totalWeight: bookingData.totalWeight,
            grossWeight: bookingData.grossWeight,
            pieces: bookingData.pieces,
            length: bookingData.length,
            width: bookingData.width,
            height: bookingData.height,
            weight: bookingData.weight,
            promoCode: bookingData.promoCode,
            finalPrice: price,
            flightId: flightId,
            paymentIntentId: paymentIntent.id,
          });

          console.log("Booking response from /bookings:", bookingResponse.data);

          if (bookingResponse.status === 201) {
            toast.success("Payment and booking successful!");
            console.log("Navigating to /confirmation with:", {
              flightId,
              price,
              bookingData,
              paymentIntentId: paymentIntent.id,
            });
            navigate("/confirmation", {
              state: { flightId, price, bookingData, paymentIntentId: paymentIntent.id },
            });
          } else {
            throw new Error(`Unexpected response status: ${bookingResponse.status}`);
          }
        } catch (bookingError) {
          console.error("Booking error:", {
            message: bookingError.message,
            response: bookingError.response?.data || bookingError.response || bookingError,
            request: bookingError.request || "No request data",
          });
          setError("Failed to save booking");
          toast.error(
            "Payment succeeded but booking failed. Please contact support with Payment ID: " +
            paymentIntent.id
          );
          setProcessing(false);
          return;
        }
      }
    } catch (err) {
      setError("Payment failed");
      toast.error("Payment failed");
      console.error("Payment error:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
      <p className="mb-4">Amount: EUR {price.toFixed(2)}</p>
      <p className="mb-4">Flight ID: {flightId}</p>
      <p className="mb-4">
        Shipping: {bookingData.shippingFrom} → {bookingData.shippingTo}
      </p>
      <p className="mb-4">Date: {bookingData.preferredShippingDate}</p>
      <div className="border p-4 rounded-lg mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const StripePaymentPage = () => {
  const location = useLocation();
  const { clientSecret, price, flightId, bookingData } = location.state || {};

  if (!clientSecret || !price || !flightId || !bookingData) {
    console.error("Invalid payment details:", {
      clientSecret,
      price,
      flightId,
      bookingData,
    });
    return <p>Invalid payment details. Please try again.</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        clientSecret={clientSecret}
        price={price}
        flightId={flightId}
        bookingData={bookingData}
      />
    </Elements>
  );
};

export default StripePaymentPage;