const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  location: {
    type: String,
    required: true,
    trim: true
  },

  // ✅ Map ke liye coordinates
  latitude: {
    type: Number,
    required: true
  },

  longitude: {
    type: Number,
    required: true
  },

  availableSlots: {
    type: Number,
    required: true,
    min: 0
  },

  // ✅ Total slots kitne hain
  totalSlots: {
    type: Number,
    required: true,
    min: 1
  },

  // ✅ Price per hour
  pricePerHour: {
    type: Number,
    required: true,
    min: 0
  },

  // ✅ Charger type
  chargerType: {
    type: String,
    enum: ["Fast", "Slow", "Ultra-Fast"],
    default: "Fast"
  },

  // ✅ Station active hai ya nahi
  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Station", stationSchema);