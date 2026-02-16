const mongoose = require("mongoose");
const partSchema = new mongoose.Schema({
  partName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  minimumLevel: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Part", partSchema);
