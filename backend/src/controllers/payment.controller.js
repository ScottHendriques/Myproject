import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, flightId } = req.body;

    if (!amount || !flightId) {
      return res.status(400).json({ error: "Amount and flightId are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert EUR to cents
      currency: "eur",
      payment_method_types: ["card"],
      metadata: { flightId },
    });

    console.log("Payment intent created:", {
      paymentIntentId: paymentIntent.id,
      flightId,
      amount,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent", details: error.message });
  }
};

// Confirm Payment (optional, for webhook or server-side confirmation)
export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    if (!paymentIntentId) {
      return res.status(400).json({ error: "PaymentIntentId is required" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("Payment intent confirmed:", {
      paymentIntentId,
      status: paymentIntent.status,
    });

    res.json({ status: paymentIntent.status });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment", details: error.message });
  }
};