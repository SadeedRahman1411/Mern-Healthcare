const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModels");
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

    // Validate email before proceeding
    const isValid = await validateEmail(emailLowerCase);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid email", success: false });
    }

    // Check if user already exists
    const existingUser = await (userType === "doctor"
      ? doctorModel.findOne({ email: emailLowerCase })
      : userModel.findOne({ email: emailLowerCase })
    );

    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in the correct collection
    const newUser =
      userType === "doctor"
        ? new doctorModel({ name, email: emailLowerCase, password: hashedPassword, userType, ...additionalInfo })
        : new userModel({ name, email: emailLowerCase, password: hashedPassword, userType, ...additionalInfo });

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
    let user = await userModel.findOne({ email: emailLowerCase });

    if (!user) {
      user = await doctorModel.findOne({ email: emailLowerCase });
    }

    if (!user) {
      return res.status(401).send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Email or Password", success: false });
    }

    const token = jwt.sign(
      { id: user._id, userType: user.userType }, // ✅ Fix: Storing userType in token
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error in Login Controller: ${error.message}`, success: false });
  }
};

// Get User Info Controller
const getUserInfoController = async (req, res) => {
  try {
    let user = await (req.body.userType === "doctor"
      ? doctorModel.findById(req.body.userId).select("-password")
      : userModel.findById(req.body.userId).select("-password"));

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

//const { userModel } = require("../models/userModels");
//const { doctorModel } = require("../models/doctorModels");

// Update User Info Controller
const updateUserInfoController = async (req, res) => {
  try {
    const { userId, userType, bloodType, prevMedicalDiseases, insuranceCoverage, specialistIn, degree, contactNumber } = req.body;

    let updatedUser;

    if (userType === "doctor") {
      updatedUser = await doctorModel.findByIdAndUpdate(
        userId,
        {
          $set: { specialistIn, degree, contactNumber },
        },
        { new: true }
      );
    } else {
      updatedUser = await userModel.findByIdAndUpdate(
        userId,
        {
          $set: { bloodType, prevMedicalDiseases, insuranceCoverage, contactNumber },
        },
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

module.exports = { registerController, loginController, getUserInfoController, updateUserInfoController };
