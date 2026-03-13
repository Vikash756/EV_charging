const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const stationController = require("../controllers/stationController");

// ✅ Public — koi bhi dekh sakta hai
router.get("/", stationController.getStations);

// ✅ Protected — admin only (controller mein check hai)
router.post("/", authMiddleware, stationController.createStation);
router.put("/:id", authMiddleware, stationController.updateStation);
router.delete("/:id", authMiddleware, stationController.deleteStation);

// ✅ Public — koi bhi dekh sakta hai
router.get("/:id", stationController.getStationById);

module.exports = router;