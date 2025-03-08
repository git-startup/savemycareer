// src/lib/database.ts
import mongoose from 'mongoose';

// Database connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/savemycareer';

// Cached connection 
const cached = { conn: null, promise: null } as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

export async function connect() {
  // If connection exists, return it
  if (cached.conn) {
    return cached.conn; 
  }

  // If connection is in progress, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export function disconnect() {
  return mongoose.disconnect();
}