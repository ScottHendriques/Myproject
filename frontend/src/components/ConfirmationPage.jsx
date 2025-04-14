import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flightId, price } = location.state || {};

  if (!flightId || !price) {
    return <p>Invalid confirmation details.</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Payment Confirmed!</h1>
      <p className="mt-4">Thank you for your payment.</p>
      <p className="mt-2">Flight ID: {flightId}</p>
      <p className="mt-2">Amount Paid: EUR {price.toFixed(2)}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={() => navigate('/')} // Adjust to your home route
      >
        Back to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;