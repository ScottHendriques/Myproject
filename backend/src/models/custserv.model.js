import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Reviewing', 'Approved'],
    default: 'Pending',
  },
  category: {
    type: String,
    enum: ['say-well-done', 'share-comment', 'raise-complaint', 'something-else'],
    required: true,
  },
  submittedAt: { type: Date, default: Date.now },
  awbCode: { type: String },
  handledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // New field
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;