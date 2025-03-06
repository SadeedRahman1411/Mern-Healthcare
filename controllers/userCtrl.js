const User = require("../models/userModels");
const Doctor = require("../models/doctorModels");
const Ambulance = require("../models/ambulanceModel");
const BloodRequest = require("../models/bloodRequestModel"); // Import BloodRequest model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = require("../utils/validateEmail");

// Register Controller
const registerController = async(req, res) => {
    try {
        const {
            name,
            email,
            password,
            userType,
            additionalInfo
        } = req.body;
        console.log("📩 Received registration request:", req.body);

        if (!name || !email || !password || !userType) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const emailLowerCase = email.toLowerCase();

        // Validate email before proceeding
        const isValid = await validateEmail(emailLowerCase);
        if (!isValid) {
            return res.status(400).json({
                message: "Invalid email",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await(userType === "doctor" ?
            Doctor.findOne({
                email: emailLowerCase
            }) :
            User.findOne({
                email: emailLowerCase
            })
        );

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in the correct collection
        const newUser = userType === "doctor" ?
            new Doctor({
                name,
                email: emailLowerCase,
                password: hashedPassword,
                userType,
                ...additionalInfo
            }) :
            new User({
                name,
                email: emailLowerCase,
                password: hashedPassword,
                userType,
                ...additionalInfo
            });

        await newUser.save();
        console.log(`✅ New ${userType} registered successfully:`, newUser);

        res.status(201).json({
            message: "Registered successfully",
            success: true
        });
    } catch (error) {
        console.error("❌ Registration error:", error.message);
        res.status(500).json({
            message: `Server error: ${error.message}`,
            success: false
        });
    }
};

// Login Controller
const loginController = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const emailLowerCase = email.toLowerCase();
        let user = await User.findOne({
            email: emailLowerCase
        });

        if (!user) {
            user = await Doctor.findOne({
                email: emailLowerCase
            });
        }

        if (!user) {
            return res.status(401).send({
                message: "User not found",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                message: "Invalid Email or Password",
                success: false
            });
        }

        const token = jwt.sign({
            id: user._id,
            userType: user.userType
        },
        process.env.JWT_SECRET, {
            expiresIn: "1d"
        }
        );

        res.status(200).send({
            message: "Login Success",
            success: true,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: `Error in Login Controller: ${error.message}`,
            success: false
        });
    }
};

// Get User Info Controller
const getUserInfoController = async (req, res) => {
    try {
        let user = await(req.body.userType === "doctor" ?
            Doctor.findById(req.body.userId).select("-password") :
            User.findById(req.body.userId).select("-password"));

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

// Update User Info Controller
const updateUserInfoController = async (req, res) => {
    try {
        const {
            userId,
            userType,
            bloodType,
            prevMedicalDiseases,
            insuranceCoverage,
            specialistIn,
            degree,
            contactNumber
        } = req.body;

        let updatedUser;

        if (userType === "doctor") {
            updatedUser = await Doctor.findByIdAndUpdate(
                userId, {
                    $set: {
                        specialistIn,
                        degree,
                        contactNumber
                    },
                }, {
                    new: true
                }
            );
        } else {
            updatedUser = await User.findByIdAndUpdate(
                userId, {
                    $set: {
                        bloodType,
                        prevMedicalDiseases,
                        insuranceCoverage,
                        contactNumber
                    },
                }, {
                    new: true
                }
            );
        }

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user info:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Register Ambulance
const registerAmbulance = async (req, res) => {
    try {
        const {
            city,
            area,
            ambulanceType,
            contactNumber
        } = req.body;

        // Validate required fields
        if (!city || !area || !ambulanceType || !contactNumber) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Create a new ambulance
        const newAmbulance = new Ambulance({
            city,
            area,
            ambulanceType,
            contactNumber,
        });

        await newAmbulance.save();
        console.log("✅ Ambulance registered successfully:", newAmbulance); // Log the saved data
        res.status(201).json({
            message: "Ambulance registered successfully",
            success: true
        });
    } catch (error) {
        console.error("❌ Error registering ambulance:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Fetch Ambulances by City, Area, and Type
const getAmbulances = async (req, res) => {
    try {
        const {
            city,
            area,
            type
        } = req.query;

        // Validate required fields
        if (!city || !area || !type) {
            return res.status(400).json({
                message: "City, area, and ambulance type are required",
                success: false
            });
        }

        // Fetch ambulances matching the criteria
        const ambulances = await Ambulance.find({
            city,
            area,
            ambulanceType: type
        });

        res.status(200).json({
            success: true,
            ambulances
        });
    } catch (error) {
        console.error("Error fetching ambulances:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Create Blood Request Controller
const createBloodRequestController = async(req, res) => {
    try {
        const {
            name,
            bloodType,
            city,
            area,
            contact
        } = req.body;
        //Please check these and their data types
        console.log("🩸Received Blood Request Data:", {
            name,
            bloodType,
            city,
            area,
            contact
        });

        const newBloodRequest = new BloodRequest({
            name,
            bloodType,
            city,
            area,
            contact,
        });
        //Make sure that values are being recorded
        console.log("Creating Blood Request Model:", newBloodRequest)

        await newBloodRequest.save()
            .then(savedBloodRequest => {
                console.log("✅ Saved Blood Request:", savedBloodRequest);
                res.status(201).json({
                    message: "Blood request submitted successfully",
                    success: true
                });
            })
            .catch(error => {
                console.error("❌ Error saving blood request.Details: ", error);
                res.status(500).send({
                    message: "🩸🩸Save Error",
                    success: false,
                    error
                });
            });
    } catch (error) {
        console.error("❌ API BloodReqCont Error:", error);
        res.status(500).send({
            message: "🩸API Request Error - Catch error:" + error.message,
            success: false
        });
    }
};

// Get Blood Profiles Controller
const getBloodProfiles = async (req, res) => {
    try {
        const { bloodType, city } = req.body;

        // To be found
        const profiles = await BloodRequest.find({
          bloodType: bloodType,
          city: city
        }).select('-password');
        res.status(200).send({
            message: "🩸 Found Blood Profiles",
            success: true,
            profiles: profiles,
        });
    } catch (error) {
        console.error("❌ Error fetching blood profiles:", error);
        res.status(500).json({
            message: `🩸 Server error: ${error.message}`,
            success: false
        });
    }
};
module.exports = {
    registerController,
    loginController,
    getUserInfoController,
    updateUserInfoController,
    registerAmbulance,
    getAmbulances,
    createBloodRequestController, // Add this line
    getBloodProfiles,
};