import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./bloodRequestForm.css";

const BloodRequest = ({ refreshRequests }) => {
  const [formData, setFormData] = useState({
    bloodType: "",
    city: "",
  });

  const [bloodProfiles, setBloodProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Bangladesh cities data
  const cities = [
    "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Sylhet", "Barisal", "Rangpur", "Mymensingh"
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      // Load blood profiles related
      const searchResults = await loadBloodProfiles(formData);

      // Here blood profiles are updated
      setBloodProfiles(searchResults);

      setFormData({ bloodType: "", city: "" });
      //If it exists refresh request is valid,run the code.
    } catch (error) {
        console.error("Form Submission Error:", error);
    } finally {
      setIsLoading(false);
      if(refreshRequests) {
        refreshRequests();
      }
    }
  };

  //Function to load the blood profiles
  const loadBloodProfiles = async (searchCriteria) => {
      setIsLoading(true);
      try {
          //Make and process API request
          const token = localStorage.getItem("token") || sessionStorage.getItem("token");

          //Make GET request to the blood profiles.
          const response = await axios.get("/api/v1/user/bloodProfiles/",{
            params: searchCriteria,  // Use params for passing search criteria
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("Profiles Fetch API responded with status:", response.status);

        if (response.status === 200 && response.data.success) {
            if (response.data.profiles && response.data.profiles.length) {
              alert("Found Profiles")
              //We return data
                return response.data.profiles
            } else {
                alert("No profiles found that match the criteria.");
            }
          }  else {
              //Show an error message related if it failed
              const errorText = await response.text();
              console.error("Profile List API returned issue")
          }
      } catch (error) {
        //Here the code handles if there is an issue running at all!
        console.error("An error occurred during processing", error);
      } finally {
          //We stop it from loading.
          setIsLoading(false);
           navigate("/bloodreq");
      }
    };
  return (
    <>
      {/* Navbar */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container">
            <a className="navbar-brand fw-bold fs-4" href="/">ASAP Health Care Service</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="#navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link text-white" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/bloodreqform">Donate Blood</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Blood Request Message */}
      <div className="container mt-4">
        <div className="blood-request-message p-3 bg-light">
          <h4 className="text-danger fw-bold">BLOOD REQUEST</h4>
          <p>
            If you or someone you love is in urgent need of blood, we are here for you.
            Our team is dedicated to connecting you with life-saving donors as quickly as possible.
            Keep your trust in us, and contact us immediately for emergency blood support.
          </p>
          <p>
            Your request is our priority. We understand the urgency and are committed to making a difference.
            Reach out to us now and let us help you in this crucial moment.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mt-4">
        <form className="blood-request-form p-4 shadow bg-white rounded" onSubmit={handleSubmit}>
          <h5 className="mb-3 text-danger fw-bold text-center">Blood Request Form</h5>

          {/* Blood Type */}
          <div className="mb-3">
            <select
              className="form-control"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* City Select Box */}
          <div className="mb-3">
            <select
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="button-group d-flex justify-content-between">
            <button type="submit" className="btn btn-danger" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit Request"}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = "/learn-more"}>
              Learn More
            </button>
          </div>
        </form>
      </div>

      {/* Blood Request Profile Display Area */}
      <div className="container mt-5">
        {bloodProfiles && bloodProfiles.length > 0 ? (
          <>
            <h4 className="text-center mb-4">Matching Blood Donor Profiles</h4>
            <div className="blood-profile-container">
              {bloodProfiles.map((profile, index) => (
                <div className="blood-profile-card p-3 shadow bg-light rounded" key={index}>
                  <h5 style={{textAlign: "center"}}>{profile.name}</h5>
                  <p>Blood Type: {profile.bloodType}</p>
                  <p>City: {profile.city}</p>
                  <p>Area: {profile.area}</p>
                  <p>Contact: {profile.contact}</p>
                  {/* You can add more relevant info */}
                </div>
              ))}
            </div>
          </>
        ) : (
           !isLoading && <p className="text-center">No matching blood profiles found.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-danger text-white text-center py-3 mt-4">
        <p className="mb-0">© 2025 ASAP Health Care Service. All Rights Reserved.</p>
        <p className="mb-0">We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.</p>
      </footer>
    </>
  );
};

export default BloodRequest;