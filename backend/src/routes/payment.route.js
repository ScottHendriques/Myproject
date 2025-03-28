import express from "express";
import { createPaymentSession } from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-payment-session", protectRoute, createPaymentSession);

export default router;