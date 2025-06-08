const mongoose = require("mongoose");

const fieldResponseSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  scheduledAt: { type: Date, required: true },
  responses: [fieldResponseSchema],
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
