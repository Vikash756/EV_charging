const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 1. Load environment variables FIRST
dotenv.config();

// 2. Import config and middleware
const connectDB = require("./config/db");
const logger = require("./config/logger");
const errorHandler = require("./middleware/errorMiddleware");

// 3. Connect to Database (now it can see MONGO_URI)
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/stations", require("./routes/stationRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});