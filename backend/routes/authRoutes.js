const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const { registerValidation } = require("../validators/authValidator");

const validate = require("../middleware/validate");

router.post("/register", registerValidation, validate, registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

module.exports = router;