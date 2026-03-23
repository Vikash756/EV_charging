const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");           // ✅ add karo
const { Server } = require("socket.io"); // ✅ add karo

dotenv.config();

const connectDB = require("./config/db");
const logger = require("./config/logger");
const errorHandler = require("./middleware/errorMiddleware");

connectDB();

const app = express();
const server = http.createServer(app);  // ✅ http server banao

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// ✅ io ko globally available banao
app.set("io", io);

app.use(cors());
app.use(express.json());

// ✅ Socket connection
io.on("connection", (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/stations", require("./routes/stationRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "EV Charging API is running! ⚡" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// ✅ app.listen ki jagah server.listen
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});