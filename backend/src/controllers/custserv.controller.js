import express from "express";
import Feedback from "../models/custserv.model.js";

const router = express.Router();

router.post("/submitFeedback", async (req, res) => {
  try {
    const { name, email, message, category, awbCode } = req.body;

    if (!name || !email || !message || !category) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const feedback = new Feedback({
      name,
      email,
      message,
      category,
      awbCode,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error submitting feedback:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/getAllFeedback", async (req, res) => {
    try {
      const feedbacks = await Feedback.find(); // Fetch all feedback from the database
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error.message);
      res.status(500).json({ message: "Internal server error." });
    }
  });

export default router;