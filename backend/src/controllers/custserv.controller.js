import express from 'express';
import Feedback from '../models/custserv.model.js';

const router = express.Router();

// Submit feedback
router.post('/submitFeedback', async (req, res) => {
  try {
    const { name, email, message, category, awbCode } = req.body;

    if (!name || !email || !message || !category) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const feedback = new Feedback({
      name,
      email,
      message,
      category,
      awbCode,
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error submitting feedback:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get all feedback
router.get('/getAllFeedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update feedback status
router.put('/updateFeedback/:id', async (req, res) => {
  try {
    const { status, adminId } = req.body; // Expect adminId from frontend
    const feedbackId = req.params.id;

    if (!['Pending', 'Reviewing', 'Approved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const updateData = { status };
    if (status === 'Reviewing' || status === 'Approved') {
      updateData.handledBy = adminId;
    }

    const feedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      updateData,
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found.' });
    }

    res.status(200).json({ message: 'Feedback status updated.', feedback });
  } catch (error) {
    console.error('Error updating feedback status:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Count handled feedback
router.get('/handled/:adminId', async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const count = await Feedback.countDocuments({
      handledBy: adminId,
      status: { $in: ['Reviewing', 'Approved'] },
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching handled feedback count:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;