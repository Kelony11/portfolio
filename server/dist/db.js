"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
// Function: Verifies and Connect to MongoDB 
async function connectDB(uri) {
    if (!uri)
        throw new Error("Missing MONGODB_URI");
    mongoose_1.default.set("strictQuery", true);
    await mongoose_1.default.connect(uri);
    console.log("✅ Success: Connected to MongoDB");
}
//# sourceMappingURL=db.js.map