const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const Ambulance = require("../models/ambulanceModel");
const {
    registerController,
    loginController,
    getUserInfoController,
    updateUserInfoController,
    registerAmbulance,
    getAmbulances,
    createBloodRequestController, // Add this line
    getBloodProfiles
} = require("../controllers/userCtrl");

const router = express.Router();

// Search for ambulances based on city, area, and type
router.get("/ambulances", async(req, res) => {
    try {
        const {
            city,
            area,
            type
        } = req.query;
        let filter = {};

        if (city) filter.city = city;
        if (area) filter.area = area;
        if (type) filter.ambulanceType = type; // Ensure correct matching

        const ambulances = await Ambulance.find(filter);
        res.status(200).json({
            success: true,
            ambulances
        });
    } catch (error) {
        console.error("Error fetching ambulances:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
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

// Blood request route
router.post("/bloodRequests", createBloodRequestController); // Add this line
router.get("/bloodProfiles", authMiddleware, getBloodProfiles);

module.exports = router;