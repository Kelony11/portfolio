import mongoose from "mongoose";

type ConnectDBOptions = {
  /** If true, skips connecting when already connected */
  reuseExisting?: boolean;
  /** Helpful label for logs (e.g., "dev", "prod") */
  label?: string;
};

let connectingPromise: Promise<typeof mongoose> | null = null;

export async function connectDB(
  uri: string,
  { reuseExisting = true, label = "mongo" }: ConnectDBOptions = {}
) {
  if (!uri) throw new Error("Missing MONGODB_URI");

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const state = mongoose.connection.readyState;

  if (reuseExisting && state === 1) return mongoose;
  if (connectingPromise) return connectingPromise;

  mongoose.set("strictQuery", true);

  connectingPromise = mongoose
    .connect(uri, {
      // Tighten behavior + reduce weird timeouts in server environments
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
      maxPoolSize: 10,
      minPoolSize: 0,
      // optional: ensure consistent writes
      // w: "majority",
    })
    .then((m) => {
      console.log(`✅ Success: Connected to MongoDB (${label})`);
      return m;
    })
    .catch((err) => {
      console.error(`❌ MongoDB connection failed (${label}):`, err?.message ?? err);
      // allow retries on next call
      connectingPromise = null;
      throw err;
    });

  return connectingPromise;
}
