const express = require("express");
const router = express.Router();
const partController = require("../controllers/partController");

router.post("/add", partController.addPart);
router.get("/", partController.getAllParts);
router.put("/add-stock/:id", partController.addStock);
router.put("/remove-stock/:id", partController.removeStock);

module.exports = router;
