const Part = require("../models/Part");
const StockMovement = require("../models/stockMovement");

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

// Add Stock
exports.addStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const part = await Part.findById(req.params.id);

    if (!part) return res.status(404).json({ message: "Part not found" });

    part.quantity += quantity;
    await part.save();

    await StockMovement.create({
      part: part._id,
      action: "Added",
      quantity
    });

    res.json({ message: "Stock added", part });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove Stock
exports.removeStock = async (req, res) => {
  try {
    const { quantity, reason } = req.body;
    const part = await Part.findById(req.params.id);

    if (!part) return res.status(404).json({ message: "Part not found" });

    if (part.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    part.quantity -= quantity;
    await part.save();

    await StockMovement.create({
      part: part._id,
      action: "Removed",
      quantity,
      reason
    });

    res.json({ message: "Stock removed", part });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const parts = await Part.find();

    const totalParts = parts.length;

    const lowStockItems = parts.filter(
      part => part.quantity < part.minimumLevel
    ).length;

    const totalInventoryValue = parts.reduce(
      (sum, part) => sum + (part.quantity * part.unitPrice),
      0
    );

    res.json({
      totalParts,
      lowStockItems,
      totalInventoryValue
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Stock Movement History
exports.getStockHistory = async (req, res) => {
  try {
    const history = await StockMovement
      .find()
      .populate("part", "partName")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(history);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};