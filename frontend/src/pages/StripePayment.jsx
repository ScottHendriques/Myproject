// src/pages/StripePaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

const StripePaymentForm = ({ price, flightId, token, inrPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5001/api/payment/create-payment-intent',
          { price, flightId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error('Error fetching client secret:', err);
        setError('Failed to initiate payment');
        toast.error('Failed to initiate payment');
      }
    };
    fetchClientSecret();
  }, [price, flightId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setError('Payment setup incomplete');
      setProcessing(false);
      toast.error('Payment setup incomplete');
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/booking-confirmation', // Fallback
      },
      redirect: 'if_required', // Prevent redirect for UPI
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      toast.success('Payment succeeded!');
      // Redirect to BookingConfirmation with payment details
      navigate('/booking-confirmation', {
        state: {
          flightId,
          price,
          inrPrice,
          paymentIntentId: paymentIntent.id,
        },
      });
    } else {
      setError('Payment not completed');
      setProcessing(false);
      toast.error('Payment not completed');
    }
  };

  return (
    <div className="p-6 text-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Complete Your Payment</h1>
      <p className="mt-4">Flight ID: {flightId}</p>
      <p className="mt-2">Price: EUR {price.toFixed(2)} (INR {inrPrice.toFixed(2)})</p>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="border p-4 rounded-lg">
          <PaymentElement
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['upi'],
            }}
          />
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {succeeded && <div className="text-green-500 mt-2">Payment succeeded!</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          disabled={!stripe || !clientSecret || processing || succeeded}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

const StripePaymentPage = () => {
  const location = useLocation();
  const { price, flightId } = location.state || {};
  const token = localStorage.getItem('authToken');
  const [inrPrice, setInrPrice] = useState(0);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await response.json();
        setInrPrice(price * data.rates.INR);
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
        setInrPrice(price * 90); // Fallback
      }
    };
    if (price) fetchRate();
  }, [price]);

  if (!price || !flightId || !token) {
    return <p>Invalid payment details or authentication. Please try again.</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm price={price} flightId={flightId} token={token} inrPrice={inrPrice} />
    </Elements>
  );
};

export default StripePaymentPage;