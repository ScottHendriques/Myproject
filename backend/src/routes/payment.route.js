// backend/src/routes/payment.route.js
import express from 'express';
import Stripe from 'stripe';
import fetch from 'node-fetch'; // For exchange rate API

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Fetch real-time EUR to INR conversion rate
const getConversionRate = async () => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    const data = await response.json();
    return data.rates.INR;
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    return 90; // Fallback static rate
  }
};

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { price, flightId } = req.body;

    // Validate inputs
    if (!price || !flightId) {
      return res.status(400).json({ error: 'Price and flightId are required' });
    }

    // Get conversion rate (EUR to INR)
    const conversionRate = await getConversionRate();
    const amountInInr = Math.round(price * conversionRate * 100); // EUR to INR, then to paise

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInInr,
      currency: 'inr',
      payment_method_types: ['upi'],
      metadata: { flightId, originalEurPrice: price }, // Store EUR for reference
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;