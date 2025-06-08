const mongoose = require("mongoose");

const customFieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "textarea", "select"],
    required: true,
  },
  options: [String], // solo para tipo "select"
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  durationMinutes: { type: Number },
  customFields: [customFieldSchema]
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
