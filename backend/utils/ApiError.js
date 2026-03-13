class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError"; // ✅ logger mein clearly dikhega
  }
}

module.exports = ApiError;