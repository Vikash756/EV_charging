const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,          // ✅ consistent response
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined  // ✅ stack trace better hai full error object se
  });
};

module.exports = errorHandler;