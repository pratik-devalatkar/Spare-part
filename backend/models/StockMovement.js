const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema({
  part: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Part",
    required: true,
  },
  action: {
    type: String,
    enum: ["Added", "Removed"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    default: "",
  }
}, { timestamps: true });

module.exports = mongoose.model("StockMovement", stockMovementSchema);
