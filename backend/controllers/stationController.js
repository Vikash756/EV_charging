const Station = require("../models/Station");

const getStations = async (req, res, next) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error) {
        next(error);
    }
};

const createStation = async (req, res, next) => {
    try {
        const station = new Station(req.body);
        await station.save();
        res.status(201).json(station);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStations,
    createStation
};