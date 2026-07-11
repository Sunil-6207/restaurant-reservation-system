const { body } = require("express-validator");

const tableValidation = [

    body("tableNumber")
        .isInt({ min: 1 })
        .withMessage("Table number must be a positive integer"),

    body("capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1"),

    body("location")
        .isIn(["Indoor", "Outdoor", "VIP"])
        .withMessage("Invalid location"),

    body("status")
        .optional()
        .isIn(["Available", "Reserved", "Maintenance"])
        .withMessage("Invalid table status")

];

module.exports = {
    tableValidation
};