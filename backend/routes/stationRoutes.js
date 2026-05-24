const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const stationController = require("../controllers/stationController");

// ✅ Public — koi bhi dekh sakta hai
router.get("/", stationController.getStations);

// ✅ Protected — sirf admin access
router.post("/", authMiddleware, adminMiddleware, stationController.createStation);
router.put("/:id", authMiddleware, adminMiddleware, stationController.updateStation);
router.delete("/:id", authMiddleware, adminMiddleware, stationController.deleteStation);

// ✅ Public — koi bhi dekh sakta hai
router.get("/:id", stationController.getStationById);

module.exports = router;