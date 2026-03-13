const Station = require("../models/Station");

// Anyone dekh sakta hai ✅
const getStations = async (req, res, next) => {
  try {
    const stations = await Station.find();
    res.json({ success: true, data: stations });
  } catch (error) {
    next(error);
  }
};

// Sirf admin ✅
const createStation = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const station = new Station(req.body);
    await station.save();
    res.status(201).json({ success: true, data: station });
  } catch (error) {
    next(error);
  }
};

// Sirf admin ✅
const updateStation = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const station = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  // updated document return karo
    );
    if (!station) {
      return res.status(404).json({ success: false, message: "Station not found" });
    }
    res.json({ success: true, data: station });
  } catch (error) {
    next(error);
  }
};

// Sirf admin ✅
const deleteStation = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) {
      return res.status(404).json({ success: false, message: "Station not found" });
    }
    res.json({ success: true, message: "Station deleted" });
  } catch (error) {
    next(error);
  }
};

// Single station dekho
const getStationById = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);

    if (!station) {
      return res.status(404).json({ success: false, message: "Station not found" });
    }

    res.json({ success: true, data: station });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStations, getStationById, createStation, updateStation, deleteStation };