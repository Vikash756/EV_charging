const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const parts = token.split(" ");

    // ✅ "Bearer <token>" format check
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ success: false, message: "Invalid token format. Use: Bearer <token>" });
    }

    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
    req.user = decoded; // ✅ { id, role, email } hona chahiye
    next();

  } catch (err) {

    // ✅ Token expire hone pe alag message
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired, please login again" });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;