const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodType: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BloodRequest = mongoose.model("BloodRequest", bloodRequestSchema, "blood"); // "blood" specifies the collection name
module.exports = BloodRequest;