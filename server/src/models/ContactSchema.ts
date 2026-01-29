import mongoose from "mongoose";

// Shape of a contact message stored in MongoDB.
export interface ContactDoc {
    name: string;
    email: string;
    message: string;
    phone?: string;
    phoneType?: string;
    wantsReply?: boolean;
}

const ContactSchema = new mongoose.Schema<ContactDoc>(

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

// Auto-delete messages ~30 days after createdAt
ContactSchema.index({ createdAt: 1}, {expireAfterSeconds: 60 * 60 * 24 * 30});

export const Contact = mongoose.model<ContactDoc>("Contact", ContactSchema);
