const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careerpulse_ai');
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[Database Error] ${error.message}`);
    // Do not crash server in development if local mongo is booting or has network quirks
    console.warn('[Database Warning] Continuing in degraded mode if DB is reconnecting.');
  }
};

module.exports = connectDB;
