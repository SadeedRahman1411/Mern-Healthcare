const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const axios = require("axios");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));


// Routes
app.use("/api/v1/user", require("./routes/userRoutes")); // User routes
app.use("/api/v1/ambulance", require("./routes/userRoutes")); // Ambulance routes

// Email Verification Route
app.post("/api/v1/verify-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const apiKey = process.env.ABSTRACT_API_KEY; // Load API key from .env
    const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

    const response = await axios.get(apiUrl);

    res.json(response.data); // Send API response to client
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Server Port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white
  );
});
