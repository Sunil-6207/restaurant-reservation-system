const express = require("express");

const router = express.Router();

const {
    createTable,
    getAllTables,
    getTableById,
    updateTable,
    deleteTable
} = require("../controllers/tableController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const { tableValidation } = require("../validators/tableValidator");
const validate = require("../middleware/validate");

router.post("/", protect, authorize("admin"), tableValidation, validate, createTable);

router.get("/", protect, getAllTables);

router.get("/:id", protect, getTableById);

router.put("/:id", protect, authorize("admin"), updateTable);

router.delete("/:id", protect, authorize("admin"), deleteTable);


module.exports = router;