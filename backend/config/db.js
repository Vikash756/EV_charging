const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`); // host bhi dikhega
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`); // sirf message, poora error object nahi
    process.exit(1);
  }
};

module.exports = connectDB;