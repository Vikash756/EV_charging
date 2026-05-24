const mongoose = require("mongoose");
const logger = require("./logger");
const Station = require("../models/Station");

const seedStations = async () => {
  try {
    const count = await Station.countDocuments();
    if (count === 0) {
      logger.info("No stations found in database. Seeding default stations...");
      const defaultStations = [
        {
          name: "Charger A1",
          location: "Sector 5, Jaipur",
          latitude: 26.9124,
          longitude: 75.7873,
          availableSlots: 3,
          totalSlots: 5,
          pricePerHour: 80,
          chargerType: "Fast",
          isActive: true
        },
        {
          name: "Charger B3",
          location: "Mall Road, Delhi",
          latitude: 28.6139,
          longitude: 77.2090,
          availableSlots: 0,
          totalSlots: 4,
          pricePerHour: 60,
          chargerType: "Slow",
          isActive: true
        },
        {
          name: "Charger C2",
          location: "Koramangala, Bangalore",
          latitude: 12.9716,
          longitude: 77.5946,
          availableSlots: 4,
          totalSlots: 6,
          pricePerHour: 120,
          chargerType: "Ultra-Fast",
          isActive: true
        },
        {
          name: "Charger D1",
          location: "Andheri, Mumbai",
          latitude: 19.0760,
          longitude: 72.8777,
          availableSlots: 0,
          totalSlots: 3,
          pricePerHour: 50,
          chargerType: "Slow",
          isActive: false
        },
        {
          name: "Charger E4",
          location: "Sector 18, Noida",
          latitude: 28.5708,
          longitude: 77.3258,
          availableSlots: 2,
          totalSlots: 5,
          pricePerHour: 90,
          chargerType: "Fast",
          isActive: true
        },
        {
          name: "Charger F2",
          location: "Banjara Hills, Hyderabad",
          latitude: 17.3850,
          longitude: 78.4867,
          availableSlots: 5,
          totalSlots: 5,
          pricePerHour: 150,
          chargerType: "Ultra-Fast",
          isActive: true
        }
      ];
      await Station.insertMany(defaultStations);
      logger.info("Default stations seeded successfully.");
    }
  } catch (error) {
    logger.error(`Error seeding stations: ${error.message}`);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    await seedStations();
  } catch (error) {
    logger.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;