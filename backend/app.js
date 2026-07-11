const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const tableRoutes = require("./routes/tableRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const limiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// =======================
// Security Middleware
// =======================
app.use(helmet());

// =======================
// Logging Middleware
// =======================
app.use(morgan("dev"));

// =======================
// CORS
// =======================
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// =======================
// JSON Parser
// =======================
app.use(express.json());

// =======================
// Rate Limiter
// =======================
app.use(limiter);

// =======================
// Home Route
// =======================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Restaurant Reservation API is running 🚀",
    });
});

// =======================
// Health Check
// =======================
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy",
    });
});

// =======================
// Routes
// =======================
app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/dashboard", dashboardRoutes);

// =======================
// 404 Handler
// =======================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// =======================
// Global Error Handler
// =======================
app.use(errorHandler);

module.exports = app;