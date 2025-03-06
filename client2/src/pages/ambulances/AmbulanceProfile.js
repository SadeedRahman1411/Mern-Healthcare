import React from "react";
import "./AmbulanceProfile.css"; // Create this CSS file

const AmbulanceProfile = ({ ambulance }) => {
  console.log("Ambulance Profile Received Data", ambulance); //ADD THIS LINE
  return (
    <div className="ambulance-profile">
      <h3>{ambulance.ambulanceType}</h3>
      <p>City: {ambulance.city}</p>
      <p>Area: {ambulance.area}</p>
      <p>Contact: {ambulance.contactNumber}</p>
      {/* Add more ambulance details as needed */}
    </div>
  );
};

export default AmbulanceProfile; // Default export