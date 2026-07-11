const Table = require("../models/Table");

const Reservation = require("../models/Reservation");

// Create Table
const createTable = async (req, res) => {
    try {
        const table = await Table.create(req.body);

        res.status(201).json({
            success: true,
            table
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Tables
const getAllTables = async (req, res) => {
    try {
        const tables = await Table.find().sort({ tableNumber: 1 });

        res.status(200).json({
            success: true,
            count: tables.length,
            tables
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Table By ID
const getTableById = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);

        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }

        res.status(200).json({
            success: true,
            table
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Table
const updateTable = async (req, res) => {
    try {

        const table = await Table.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Table updated successfully",
            table
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteTable = async (req, res) => {
    try {

        const table = await Table.findById(req.params.id);

        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }

        // Check if any active reservation exists
        const activeReservation = await Reservation.findOne({
            table: table._id,
            status: "Confirmed"
        });

        if (activeReservation) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete table because it has active reservations."
            });
        }

        await Table.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Table deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createTable,
    getAllTables,
    getTableById,
    updateTable,
    deleteTable
};