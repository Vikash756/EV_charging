const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true  // ✅ "Test@Gmail.com" = "test@gmail.com"
  },

  password: {
    type: String,
    required: true,
    minlength: 6  // ✅ minimum 6 characters
  },

  // ✅ Role — controllers mein req.user.role use ho raha hai
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);