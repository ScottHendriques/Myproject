import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import aviationRoutes from "./routes/aviation.routes.js";
import cargoRoutes from "./routes/cargo.route.js";
import feedbackRoutes from "./controllers/custserv.controller.js";

dotenv.config();
const API_KEY = process.env.AVIATIONSTACK_API_KEY;

const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/aviation", aviationRoutes);
app.use("/api", cargoRoutes);
app.use("/api/feedback", feedbackRoutes);

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});