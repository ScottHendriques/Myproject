import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, flightId } = location.state || {};

  const handlePayment = () => {
    if (!price || !flightId) {
      toast.error('Invalid payment details');
      return;
    }

    // Redirect to Stripe payment page with state
    navigate('/stripe-payment', {
      state: { price, flightId },
    });
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