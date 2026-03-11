const Booking = require("../models/Booking");

exports.createBooking = async (req, res, next) => {
    try {
        // Use req.user.id from authMiddleware instead of req.body.userId for security
        const newBooking = new Booking({
            ...req.body,
            userId: req.user.id 
        });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        next(err);
    }
};

exports.getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate("userId", "name email")
            .populate("stationId");
        res.json(bookings);
    } catch (err) {
        next(err);
    }
};