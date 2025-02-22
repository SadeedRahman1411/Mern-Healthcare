// userCtrls.js (Added Logging & Fixes)
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = require("../utils/validateEmail");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received registration request:", req.body);
    
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required", success: false });
    }
    
    const emailLowerCase = email.toLowerCase();
    const isValid = await validateEmail(emailLowerCase);
    console.log("Email validation result:", isValid);
    
    if (!isValid) {
      return res.status(400).send({ message: "Invalid email address", success: false });
    }
    
    const existingUser = await userModel.findOne({ email: emailLowerCase });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists", success: false });
    }
    
    if (password.length < 6) {
      return res.status(400).send({ message: "Password must be at least 6 characters long", success: false });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email: emailLowerCase, password: hashedPassword });
    await newUser.save();
    
    res.status(201).send({ message: "Registered successfully", success: true });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({ message: `Error in Register Controller: ${error.message}`, success: false });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
    const user = await userModel.findOne({ email: emailLowerCase });
    if (!user) {
      return res.status(401).send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error in Login Controller: ${error.message}` });
  }
};
module.exports = { registerController, loginController };