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
        toast.success("Payment successful!");
        console.log("Navigating to /confirmation with:", {
          flightId,
          price,
          bookingData,
        });
        navigate("/confirmation", { state: { flightId, price, bookingData } });
      }
    } catch (err) {
      setError("Payment failed");
      toast.error("Payment failed");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
      <p className="mb-4">Amount: EUR {price.toFixed(2)}</p>
      <p className="mb-4">Flight ID: {flightId}</p>
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