const express = require("express");
const router = express.Router();
const partController = require("../controllers/partController");

router.post("/add", partController.addPart);

module.exports = router;
