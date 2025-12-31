import mongoose from "mongoose";
import { type } from "os";

const ContactSchema = new mongoose.Schema(

    {
        name: { type: String, required: true, trim: true, maxlength: 80},
        email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
        message: { type: String, required: true, trim: true, maxlength: 2000},

        phone: { type: String, trim: true, maxlength: 30 },
        phoneType: { type: String, trim: true, maxlength: 30 },
        wantsReply: { type: Boolean, default: true },
    },

    { timestamps: true }

);

// Auto-delete messages ~90 days after createdAt
ContactSchema.index({ createdAt: 1}, {expireAfterSeconds: 60 * 60 * 24 * 90});

export const Contact = mongoose.model("Contact", ContactSchema);