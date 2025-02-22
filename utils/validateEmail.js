// validateEmail.js (Improved Logging for Debugging)
const axios = require("axios");
const validateEmail = async (email) => {
  try {
    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`
    );
    console.log("Email API Response:", response.data);
    return response.data.deliverability === "DELIVERABLE";
  } catch (error) {
    console.error("Email validation error:", error);
    return false;
  }
};
module.exports = validateEmail;