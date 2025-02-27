const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  userType: { type: String, default: "patient" }, // ✅ Explicit userType field
  bloodType: { type: String }, // Blood type for patient
  prevMedicalDiseases: [{ type: String }], // Array for previous medical diseases
  insuranceCoverage: [{ type: String }], // Array for insurance companies
  contactNumber: { type: String }, // Contact number for patient
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
