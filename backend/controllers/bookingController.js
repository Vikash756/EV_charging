const Booking = require("../models/Booking");

exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      userId: req.user.id  // ✅ security sahi hai
    });
    const savedBooking = await newBooking.save();
    res.status(201).json({ success: true, data: savedBooking });
  } catch (err) {
    next(err);
  }
};

// Sirf apni bookings dekho
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("stationId", "name location");
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

// Sirf admin ke liye — sabki bookings
exports.getAllBookings = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("stationId", "name location");
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

// Booking cancel karo
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // ✅ Sirf apni booking cancel kar sakta hai
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({ success: false, message: "Booking already cancelled" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ success: true, message: "Booking cancelled", data: booking });
  } catch (err) {
    next(err);
  }
};

// Booking status update (admin only)
exports.updateBookingStatus = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};