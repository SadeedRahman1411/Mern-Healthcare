const axios = require("axios");

const validateEmail = async (email) => {
  try {
    // Basic regex check for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format detected:", email);
      return false;
    }

    // Call Abstract API for further validation
    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`
    );

    console.log("📩 Email API Response:", response.data);

    // Check if API response indicates a valid, deliverable email
    if (!response.data || !response.data.deliverability) {
      console.error("Invalid response from email validation API");
      return false;
    }

    return response.data.deliverability === "DELIVERABLE" && response.data.is_valid_format.value;
  } catch (error) {
    console.error("❌ Email validation error:", error.response ? error.response.data : error.message);
    return false;
  }
};

module.exports = validateEmail;
