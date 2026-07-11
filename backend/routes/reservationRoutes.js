const express = require("express");

const router = express.Router();

// Controllers
const {
    createReservation,
    getMyReservations,
    getAllReservations,
    cancelReservation,
    updateReservation
} = require("../controllers/reservationController");

// Middleware
const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    reservationValidation
} = require("../validators/reservationValidator");

const validate = require("../middleware/validate");

// =============================
// Customer Routes
// =============================

// Create Reservation
router.post("/", protect, reservationValidation, validate, createReservation);

// Get Logged-in User Reservations
router.get("/my", protect, getMyReservations);

// Cancel Reservation
router.put("/:id/cancel", protect, cancelReservation);

// =============================
// Admin Routes
// =============================

// Get All Reservations
router.get("/", protect, authorize("admin"), getAllReservations);
router.put("/:id", protect, updateReservation);

module.exports = router;