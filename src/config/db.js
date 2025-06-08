const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined in .env");

    await mongoose.connect(uri);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
