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

  if (reuseExisting && state === 1) {
    console.log(`ℹ️  Already connected to MongoDB (${label})`);
    return mongoose;
  }
  
  if (state === 2) {
    console.log(`ℹ️  Connection in progress, waiting... (${label})`);
    if (connectingPromise) return connectingPromise;
  }

  mongoose.set("strictQuery", true);

  // Handle connection events for better monitoring
  mongoose.connection.on('connected', () => {
    console.log(`✅ Mongoose connected to MongoDB (${label})`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(`❌ Mongoose connection error (${label}):`, err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log(`⚠️  Mongoose disconnected from MongoDB (${label})`);
  });

  connectingPromise = mongoose
    .connect(uri, {
      // Optimized connection settings
      serverSelectionTimeoutMS: 10_000,  // Fail fast if server not found
      socketTimeoutMS: 45_000,            // Socket timeout for operations
      connectTimeoutMS: 10_000,           // Initial connection timeout
      maxPoolSize: 10,                    // Max connections in pool
      minPoolSize: 2,                     // Min connections (better for serverless)
      maxIdleTimeMS: 30_000,              // Close idle connections after 30s
      retryWrites: true,                  // Automatic retry for write operations
      retryReads: true,                   // Automatic retry for read operations
      // Ensure consistent writes
      w: "majority",
      // Auto-index for development (disable in production for performance)
      autoIndex: process.env.NODE_ENV !== 'production',
    })
    .then((m) => {
      console.log(`✅ Successfully connected to MongoDB (${label})`);
      connectingPromise = null;
      return m;
    })
    .catch((err) => {
      console.error(`❌ MongoDB connection failed (${label}):`, err?.message ?? err);
      connectingPromise = null;
      throw err;
    });

  return connectingPromise;
}
