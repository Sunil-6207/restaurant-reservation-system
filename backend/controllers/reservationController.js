const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

const asyncHandler = require("../utils/asyncHandler");

const createReservation = asyncHandler(async (req, res) => {

    const { reservationDate, guests } = req.body;

    // Find tables that can accommodate the guests
    const availableTables = await Table.find({
        capacity: { $gte: guests },
        status: "Available"
    }).sort({ capacity: 1 });

    if (availableTables.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No suitable table available."
        });
    }

    let selectedTable = null;

    // Find first table without reservation conflict
    for (const table of availableTables) {

        const existingReservation = await Reservation.findOne({
            table: table._id,
            reservationDate: new Date(reservationDate),
            status: "Confirmed"
        });

        if (!existingReservation) {
            selectedTable = table;
            break;
        }
    }

    if (!selectedTable) {
        return res.status(400).json({
            success: false,
            message: "No available table for the selected date."
        });
    }

    // Create reservation
    const reservation = await Reservation.create({
        user: req.user._id,
        table: selectedTable._id,
        reservationDate,
        guests,
        status: "Confirmed"
    });

    // Mark table reserved
    selectedTable.status = "Reserved";
    await selectedTable.save();

    res.status(201).json({
        success: true,
        message: "Reservation created successfully",
        reservation
    });

});


const getMyReservations = asyncHandler(async (req, res) => {

    const reservations = await Reservation.find({
        user: req.user._id
    })
    .populate("table", "tableNumber capacity location")
    .sort({ reservationDate: -1 });

    res.status(200).json({
        success: true,
        count: reservations.length,
        reservations
    });

});

const getAllReservations = asyncHandler(async (req, res) => {

    const reservations = await Reservation.find()
        .populate("user", "name email")
        .populate("table", "tableNumber capacity location")
        .sort({ reservationDate: -1 });

    res.status(200).json({
        success: true,
        count: reservations.length,
        reservations
    });

});

const cancelReservation = asyncHandler(async (req, res) => {

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
        return res.status(404).json({
            success: false,
            message: "Reservation not found"
        });
    }

    if (
        reservation.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    ) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }

    if (reservation.status === "Cancelled") {
        return res.status(400).json({
            success: false,
            message: "Reservation is already cancelled"
        });
    }

    reservation.status = "Cancelled";
    await reservation.save();

    res.status(200).json({
        success: true,
        message: "Reservation cancelled successfully",
        reservation
    });

});

const updateReservation = asyncHandler(async (req, res) => {

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
        return res.status(404).json({
            success: false,
            message: "Reservation not found"
        });
    }

    // Owner or Admin only
    if (
        reservation.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    ) {
        return res.status(403).json({
            success: false,
            message: "Access denied"
        });
    }

    const {
        reservationDate,
        guests
    } = req.body;

    // Find suitable tables
    const tables = await Table.find({
        capacity: { $gte: guests },
        status: "Available"
    }).sort({ capacity: 1 });

    if (tables.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No suitable table available"
        });
    }

    let selectedTable = null;

    for (const table of tables) {

        const conflict = await Reservation.findOne({
            _id: { $ne: reservation._id }, // Ignore current reservation
            table: table._id,
            reservationDate: new Date(reservationDate),
            status: "Confirmed"
        });

        if (!conflict) {
            selectedTable = table;
            break;
        }
    }

    if (!selectedTable) {
        return res.status(400).json({
            success: false,
            message: "No table available for the selected date"
        });
    }

    // Release previous table
    const previousTable = await Table.findById(reservation.table);

    if (previousTable) {
        previousTable.status = "Available";
        await previousTable.save();
    }

    // Assign new table
    reservation.table = selectedTable._id;
    reservation.reservationDate = reservationDate;
    reservation.guests = guests;

    await reservation.save();

    // Reserve new table
    selectedTable.status = "Reserved";
    await selectedTable.save();

    res.status(200).json({
        success: true,
        message: "Reservation updated successfully",
        reservation
    });

});

module.exports = {
    createReservation,
    getMyReservations,
    getAllReservations,
    updateReservation,
    cancelReservation
};