const express = require("express");
const router = express.Router();
const partController = require("../controllers/partController");
const { validateAddPart, validateAddStock, validateRemoveStock, handleValidationErrors } = require("../validators/partValidator");

router.post("/add", validateAddPart, handleValidationErrors, partController.addPart);
router.get("/", partController.getAllParts);
router.put("/add-stock/:id", validateAddStock, handleValidationErrors, partController.addStock);
router.put("/remove-stock/:id", validateRemoveStock, handleValidationErrors, partController.removeStock);
router.get("/dashboard", partController.getDashboardStats);
router.get("/history", partController.getStockHistory);

module.exports = router;
