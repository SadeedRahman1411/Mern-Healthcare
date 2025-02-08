import React, { useState } from "react";
import "./bloodRequestForm.css";

const BloodRequestForm = ({ refreshRequests }) => {
  const [formData, setFormData] = useState({
    bloodType: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              aria-controls="navbarNav"
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

      {/* Form */}
      <div className="container mt-4">
        <form className="blood-request-form p-4 shadow bg-white rounded" onSubmit={handleSubmit}>
          <h5 className="mb-3 text-danger fw-bold text-center">Blood Request Form</h5>
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
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              name="contact"
              placeholder="Enter Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-group d-flex justify-content-between">
            <button type="submit" className="btn btn-danger">
              Submit Request
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => window.location.href = "/learn-more"}>
              Learn More
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BloodRequestForm;
