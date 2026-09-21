const mongoose = require('mongoose');
const env = require('./env');

let memoryServer = null;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.warn(`[MongoDB] Primary connection to ${env.MONGO_URI} failed: ${err.message}`);
    if (env.NODE_ENV === 'development') {
      try {
        console.log('[MongoDB] Starting in-memory MongoDB fallback for development...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        const uri = memoryServer.getUri();
        const memConn = await mongoose.connect(uri);
        console.log(`[MongoDB] Connected to In-Memory MongoDB at ${memConn.connection.host}`);
      } catch (memErr) {
        console.error('[MongoDB] In-memory fallback failed:', memErr.message);
        throw err;
      }
    } else {
      throw err;
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

module.exports = { connectDB, disconnectDB };

