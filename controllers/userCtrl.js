const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModels"); // Import doctors model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = require("../utils/validateEmail");

const registerController = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    console.log("📩 Received registration request:", req.body);

    if (!name || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const emailLowerCase = email.toLowerCase();

    // Validate email before proceeding
    const isValid = await validateEmail(emailLowerCase);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid email", success: false }); // ✅ Fixed error message
    }

    // Check if user already exists in the selected collection
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

    // Save in the appropriate collection based on userType
    const newUser =
      userType === "doctor"
        ? new doctorModel({ name, email: emailLowerCase, password: hashedPassword })
        : new userModel({ name, email: emailLowerCase, password: hashedPassword });

    await newUser.save();
    console.log(`✅ New ${userType} registered successfully:`, newUser);

    res.status(201).json({ message: "Registered successfully", success: true });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ message: `Server error: ${error.message}`, success: false });
  }
};


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

    const token = jwt.sign({ id: user._id, userType: user instanceof doctorModel ? "doctor" : "patient" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error in Login Controller: ${error.message}`, success: false });
  }
};

module.exports = { registerController, loginController };
