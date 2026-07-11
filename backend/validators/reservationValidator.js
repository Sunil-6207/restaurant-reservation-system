const { body } = require("express-validator");

const reservationValidation = [

    body("reservationDate")
        .isISO8601()
        .withMessage("Enter a valid reservation date"),

    body("guests")
        .isInt({ min: 1 })
        .withMessage("Guests must be at least 1")

];

module.exports = {
    reservationValidation
};