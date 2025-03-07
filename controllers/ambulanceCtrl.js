// ambulanceCtrl.js
const Ambulance = require("../models/ambulanceModel");

const registerAmbulance = async (req, res) => {
    console.log("🚑 registerAmbulance - Request received");
    console.log("req object:", req); // Log the entire req object
    console.log("req.body in registerAmbulance:", req.body);
    console.log("req.userId in registerAmbulance:", req.userId);
    console.log("req.userType in registerAmbulance:", req.userType);
  try {
    const { city, area, ambulanceType, contactNumber,userId,userType } = req.body;

    //const createdByUserId = req.userId; // Get the user ID from req - not doing this now
   // const createdByUserType = req.userType; // Get the user type from req- not doing this now

    if (!city || !area || !ambulanceType || !contactNumber || !userId || !userType) {
      console.log("🚑 registerAmbulance - Validation Failed: Missing fields");
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const newAmbulance = new Ambulance({
      city,
      area,
      ambulanceType,
      contactNumber,
      createdBy: userId,
      createdByType: userType,
    });

    await newAmbulance.save();
    console.log("✅ Ambulance registered successfully:", newAmbulance);
    res.status(201).json({ message: "Ambulance registered successfully", success: true });
  } catch (error) {
    console.error("❌ Error registering ambulance:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAmbulances = async (req, res) => {
  try {
    const { city, area, type } = req.query;

    // Validate required fields
    if (!city || !area || !type) {
      return res.status(400).json({ message: "City, area, and ambulance type are required", success: false });
    }

    // Fetch ambulances matching the criteria
    const ambulances = await Ambulance.find({ city, area, ambulanceType: type });

    res.status(200).json({ success: true, ambulances });
  } catch (error) {
    console.error("Error fetching ambulances:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  registerAmbulance,
  getAmbulances
};