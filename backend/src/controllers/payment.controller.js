import mongoose from "mongoose";
import Stripe from 'stripe';
import Payment from "../models/payment.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentSession = async (req, res) => {
  try {
    console.log("Request Payload:", req.body);
    const { price, flightId } = req.body;
    
    // Validate the payload
    if (!price || !flightId) {
      return res.status(400).json({ message: "Price and flight ID are required" });
    }
    // Get the userId from the authenticated user (via protectRoute middleware)
    const userId = req.user._id;
    console.log("Auth Token:", token);

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Flight ${flightId}`,
            },
            unit_amount: Math.round(price * 100), // Convert price to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });
    console.log(session)
    // Save payment details to the database
    const payment = new Payment({
      userId,
      flightId,
      price,
      paymentStatus: "Pending", // Initially set to "Pending"
    });
    await payment.save();

    res.status(200).json({ url: session.url });
    
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ message: "Failed to create payment session" });
  }
};