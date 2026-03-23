const Booking = require("../models/Booking");
const Station = require("../models/Station");

exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      userId: req.user.id
    });
    const savedBooking = await newBooking.save();

    // ✅ Station ka availableSlots update karo
    const station = await Station.findById(savedBooking.stationId);
    if (station && station.availableSlots > 0) {
      station.availableSlots -= 1;
      await station.save();
    }

    // ✅ Real-time emit karo
    const io = req.app.get("io");
    io.emit("newBooking", {
      booking: savedBooking,
      message: `New booking created at ${station?.name}`
    });
    io.emit("slotUpdated", {
      stationId: savedBooking.stationId,
      availableSlots: station?.availableSlots
    });

    res.status(201).json({ success: true, data: savedBooking });
  } catch (err) {
    next(err);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("stationId", "name location");
    res.json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};

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

exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    if (booking.status === "Cancelled") {
      return res.status(400).json({ success: false, message: "Already cancelled" });
    }

    booking.status = "Cancelled";
    await booking.save();

    // ✅ Slot wapas karo
    await Station.findByIdAndUpdate(booking.stationId, {
      $inc: { availableSlots: 1 }
    });

    // ✅ Real-time emit
    const io = req.app.get("io");
    io.emit("bookingCancelled", { bookingId: booking._id });
    io.emit("slotUpdated", {
      stationId: booking.stationId,
      message: "Slot available again"
    });

    res.json({ success: true, message: "Booking cancelled", data: booking });
  } catch (err) {
    next(err);
  }
};

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

    // ✅ Real-time status update emit karo
    const io = req.app.get("io");
    io.emit("bookingStatusUpdated", {
      bookingId: booking._id,
      status: booking.status
    });

    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};