// routes/userRoutes.js
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Ambulance = require("../models/ambulanceModel");
const {
  registerController,
  loginController,
  getUserInfoController,
  updateUserInfoController,
  createBloodRequestController,
  getBloodProfiles,
  getAllDoctorsController,
  bookAppointmentController,
  getAppointmentsController,
} = require("../controllers/userCtrl");

const { registerAmbulance, getAmbulances } = require("../controllers/ambulanceCtrl");

const router = express.Router();

// Ambulance routes
router.get("/ambulances", async (req, res) => {
  try {
    const { city, area, type } = req.query;
    let filter = {};

    if (city) filter.city = city;
    if (area) filter.area = area;
    if (type) filter.ambulanceType = type;

    const ambulances = await Ambulance.find(filter);
    res.status(200).json({ success: true, ambulances });
  } catch (error) {
    console.error("Error fetching ambulances:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// User routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getUserInfo", authMiddleware, getUserInfoController);
router.put("/updateUserInfo", authMiddleware, updateUserInfoController);

// Ambulance routes
router.post("/ambulance/register", authMiddleware, registerAmbulance);
router.get("/ambulance/all", authMiddleware, getAmbulances);

// Blood request and profiles routes
router.post("/bloodRequests", createBloodRequestController);
router.get("/bloodProfiles", authMiddleware, getBloodProfiles);

// Doctor routes
router.get("/doctors", authMiddleware, getAllDoctorsController);

// Appointment routes
router.post("/book-appointment", authMiddleware, bookAppointmentController);
router.get("/appointments", authMiddleware, getAppointmentsController);

module.exports = router;
