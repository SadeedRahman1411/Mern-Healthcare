const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema({
  city: { type: String, required: [true, "City is required"] },
  area: { type: String, required: [true, "Area is required"] },
  ambulanceType: { type: String, required: [true, "Ambulance Type is required"] },
  contactNumber: { type: String, required: [true, "Contact Number is required"] },
  createdAt: { type: Date, default: Date.now },
});

const Ambulance = mongoose.model("ambulances", ambulanceSchema);
module.exports = Ambulance;