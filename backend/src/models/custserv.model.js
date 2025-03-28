import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    category: { 
        type: String, 
        enum: ["say-well-done", "share-comment", "raise-complaint", "something-else"],
        required: true 
    },
    submittedAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;