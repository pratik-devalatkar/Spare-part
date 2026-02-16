const express = require("express");
const router = express.Router();
const partController = require("../controllers/partController");

router.post("/add", partController.addPart);
router.get("/", partController.getAllParts);

module.exports = router;
