"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ContactSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    phone: { type: String, trim: true, maxlength: 30 },
    phoneType: { type: String, trim: true, maxlength: 30 },
    wantsReply: { type: Boolean, default: true },
}, { timestamps: true });
// Auto-delete messages ~90 days after createdAt
ContactSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });
exports.Contact = mongoose_1.default.model("Contact", ContactSchema);
//# sourceMappingURL=ContactSchema.js.map