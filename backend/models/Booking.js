const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true
  },

  // ✅ Kab charging shuru hogi
  startTime: {
    type: Date,
    required: true
  },

  // ✅ Kab khatam hogi
  endTime: {
    type: Date,
    required: true
  },

  // ✅ Total amount
  amount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "Booked",
    enum: ["Booked", "Completed", "Cancelled"]
  }

}, { timestamps: true }); // ✅ createdAt, updatedAt automatically

module.exports = mongoose.model("Booking", bookingSchema);