import React, { useState } from "react";
import "./bloodRequestForm.css";

const BloodRequestForm = ({ refreshRequests }) => {
  const [formData, setFormData] = useState({
    bloodType: "",
    address: "",
    contact: "",
  });

  const [error, setError] = useState(""); // State for contact number validation error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "contact") {
      validateContact(e.target.value);
    }
  };

  // Contact number validation: Must start with '01' and be exactly 11 digits
  const validateContact = (contact) => {
    const contactPattern = /^01\d{9}$/; // Starts with '01' and has exactly 11 digits
    if (!contactPattern.test(contact)) {
      setError("Contact number must be 11 digits and start with '01'.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return; // Prevent form submission if there's a validation error

    const response = await fetch("http://localhost:5000/api/bloodRequests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ bloodType: "", address: "", contact: "" });
      refreshRequests();
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

          {/* Address */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Number */}
          <div className="mb-3">
            <input
              type="tel"
              className={`form-control ${error ? "is-invalid" : ""}`}
              name="contact"
              placeholder="Enter Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            {error && <div className="text-danger mt-1">{error}</div>}
          </div>

          {/* Buttons */}
          <div className="button-group d-flex justify-content-between">
            <button type="submit" className="btn btn-danger" disabled={error}>
              Submit Request
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = "/learn-more"}>
              Learn More
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-danger text-white text-center py-3 mt-4">
  <p className="mb-0">&copy; 2025 ASAP Health Care Service. All Rights Reserved.</p>
  <p className="mb-0">We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.</p>
</footer>

    </>
  );
};

export default BloodRequestForm;