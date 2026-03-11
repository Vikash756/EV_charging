const express = require("express");
const router = express.Router();
const stationController = require("../controllers/stationController");

// Public route to see all stations
router.get("/", stationController.getStations); 

// Route to add a station
router.post("/", stationController.createStation);

module.exports = router;