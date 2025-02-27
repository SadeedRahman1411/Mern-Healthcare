const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  userType: { type: String, default: "doctor" }, // ✅ Explicit userType field
  specialistIn: { type: String }, // Specialization
  degree: { type: String }, // Degree
  contactNumber: { type: String }, // Contact number
});

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
