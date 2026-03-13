const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const bookingController = require("../controllers/bookingController");

// ✅ Apni bookings dekho (logged in user)
router.get("/my", authMiddleware, bookingController.getMyBookings);

// ✅ Sabki bookings (admin only — controller mein check hai)
router.get("/", authMiddleware, bookingController.getAllBookings);

// ✅ Booking banao
router.post("/", authMiddleware, bookingController.createBooking);

// ✅ Booking cancel karo
router.put("/:id/cancel", authMiddleware, bookingController.cancelBooking);

// ✅status update karo
router.put("/:id/status", authMiddleware, bookingController.updateBookingStatus);

module.exports = router;