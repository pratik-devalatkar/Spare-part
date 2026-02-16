const Part = require("../models/Part");

// Add New Part
exports.addPart = async (req, res) => {
  try {
    const { partName, quantity, minimumLevel, unitPrice } = req.body;

    const newPart = new Part({
      partName,
      quantity,
      minimumLevel,
      unitPrice
    });

    await newPart.save();

    res.status(201).json({ message: "Part added successfully", newPart });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get All Parts
exports.getAllParts = async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}