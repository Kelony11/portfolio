import mongoose from "mongoose";


const FeedbackSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, trim: true, maxlength: 30 },
        message: { type: String, required: true, trim: true, maxlength: 2000 },
    },

    { timestamps: true }

);

// Auto-delete feedback ~30 days after createdAt
FeedbackSchema.index({ createdAt: 1}, {expireAfterSeconds: 60 * 60 * 24 * 30});

export const Feedback = mongoose.model("Feedback", FeedbackSchema);