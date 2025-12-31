import mongoose from "mongoose";

// Function: Verifies and Connect to MongoDB 
export async function connectDB(uri: string) {

    if (!uri) throw new Error("Missing MONGODB_URI");

    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log("✅ Success: Connected to MongoDB");
}