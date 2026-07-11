const User = require("../models/User");
const Table = require("../models/Table");
const Reservation = require("../models/Reservation");

const getDashboardSummary = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalTables = await Table.countDocuments();

        const availableTables = await Table.countDocuments({
            status: "Available"
        });

        const confirmedReservations =
            await Reservation.countDocuments({
                status: "Confirmed"
            });

        const cancelledReservations =
            await Reservation.countDocuments({
                status: "Cancelled"
            });

        res.status(200).json({

            success: true,

            dashboard: {

                totalUsers,

                totalTables,

                availableTables,

                confirmedReservations,

                cancelledReservations

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboardSummary
};