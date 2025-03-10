// userCtrl.js
const User = require("../models/userModels");
const Doctor = require("../models/doctorModels");
const Ambulance = require("../models/ambulanceModel");
const BloodRequest = require("../models/bloodRequestModel");
const Appointment = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = require("../utils/validateEmail");

// Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, userType, additionalInfo } = req.body;
    console.log("📩 Received registration request:", req.body);

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const emailLowerCase = email.toLowerCase();

    const isValid = await validateEmail(emailLowerCase);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }

    const existingUser = await (userType === "doctor"
      ? Doctor.findOne({ email: emailLowerCase })
      : User.findOne({ email: emailLowerCase })
    );

    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userType === "doctor"
      ? new Doctor({ name, email: emailLowerCase, password: hashedPassword, userType, ...additionalInfo })
      : new User({ name, email: emailLowerCase, password: hashedPassword, userType, ...additionalInfo });

    await newUser.save();
    console.log(`✅ New ${userType} registered successfully:`, newUser);

    res.status(201).json({ message: "Registered successfully", success: true });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ message: `Server error: ${error.message}`, success: false });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
    let user = await User.findOne({ email: emailLowerCase });

    if (!user) {
      user = await Doctor.findOne({ email: emailLowerCase });
    }

    if (!user) {
      return res.status(401).send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Email or Password", success: false });
    }

    const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
      userId: user._id,
      userType: user.userType,
      redirect: "/profile", // ADD THIS LINE
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error in Login Controller: ${error.message}`, success: false });
  }
};

// Get User Info Controller
const getUserInfoController = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    let user = await (userType === "doctor"
      ? Doctor.findById(userId).select("-password")
      : User.findById(userId).select("-password")
    );

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// Update User Info Controller
const updateUserInfoController = async (req, res) => {
  try {
    const { userId, userType, bloodType, prevMedicalDiseases, insuranceCoverage, specialistIn, degree, contactNumber } = req.body;

    let updatedUser;

    if (userType === "doctor") {
      updatedUser = await Doctor.findByIdAndUpdate(
        userId,
        { $set: { specialistIn, degree, contactNumber } },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { bloodType, prevMedicalDiseases, insuranceCoverage, contactNumber } },
        { new: true }
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// Create Blood Request Controller
const createBloodRequestController = async (req, res) => {
  try {
    const { name, bloodType, city, area, contact } = req.body;
    console.log("🩸Received Blood Request Data:", { name, bloodType, city, area, contact });

    const newBloodRequest = new BloodRequest({ name, bloodType, city, area, contact });
    console.log("Creating Blood Request Model:", newBloodRequest);

    await newBloodRequest.save()
      .then(savedBloodRequest => {
        console.log("✅ Saved Blood Request:", savedBloodRequest);
        res.status(201).json({ message: "Blood request submitted successfully", success: true });
      })
      .catch(error => {
        console.error("❌ Error saving blood request. Details: ", error);
        res.status(500).send({ message: "🩸🩸Save Error", success: false, error });
      });
  } catch (error) {
    console.error("❌ API BloodReqCont Error:", error);
    res.status(500).send({ message: "🩸API Request Error - Catch error:" + error.message, success: false });
  }
};

// Get Blood Profiles Controller
const getBloodProfiles = async (req, res) => {
  try {
    const { bloodType, city, userId, userType } = req.body;
    const profiles = await BloodRequest.find({ bloodType: bloodType, city: city }).select('-password');
    res.status(200).send({ message: "🩸 Found Blood Profiles", success: true, profiles });
  } catch (error) {
    console.error("❌ Error fetching blood profiles:", error);
    res.status(500).json({ message: `🩸 Server error: ${error.message}`, success: false });
  }
};

// Get All Doctors Controller
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found", success: false });
    }
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error("Error fetching all doctors:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

// Book Appointment Controller
const bookAppointmentController = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const userId = req.body.userId;

    if (!doctorId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    const newAppointment = new Appointment({ userId, doctorId });
    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

// Get Appointments Controller
const getAppointmentsController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const appointments = await Appointment.find({ userId });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};

module.exports = {
  registerController,
  loginController,
  getUserInfoController,
  updateUserInfoController,
  createBloodRequestController,
  getBloodProfiles,
  getAllDoctorsController,
  bookAppointmentController,
  getAppointmentsController,
};