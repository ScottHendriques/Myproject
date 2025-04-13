// src/pages/BookingConfirmation.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const { flightId, price, inrPrice, paymentIntentId } = state || {};

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
      <p className="mt-4">Flight ID: {flightId || 'N/A'}</p>
      {price && inrPrice ? (
        <p className="mt-2">Amount Paid: EUR {price.toFixed(2)} (INR {inrPrice.toFixed(2)})</p>
      ) : (
        <p className="mt-2">Amount Paid: Details unavailable</p>
      )}
      <p className="mt-2">Payment ID: {paymentIntentId || 'N/A'}</p>
      <p className="mt-4">Thank you for your payment!</p>
    </div>
  );
};

export default BookingConfirmation;