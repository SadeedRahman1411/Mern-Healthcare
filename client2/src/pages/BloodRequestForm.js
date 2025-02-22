import React, { useState } from "react";
import "./bloodRequestForm.css";

const BloodRequestForm = ({ refreshRequests }) => {
  const [formData, setFormData] = useState({
    name: "",
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
      setFormData({ name: "", bloodType: "", address: "", contact: "" });
      refreshRequests();
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/">ASAP Health Care Service</a>
        </div>
      </nav>

      {/* Blood Donation Message */}
      <div className="container mt-4">
        <div className="blood-donation-message p-3 bg-light">
          <h4 className="text-danger fw-bold">BLOOD DONOR</h4>
          <p>
            Across Bangladesh, every day there remains an urgent need for all types of blood groups.
            Especially donors with rare blood groups such as O Negative, B Negative, and A Negative are in high demand.
            Your timely response is essential to the supply of healthy blood for the massive daily demand we face.
          </p>
          <p>
            Your donation can save the lives of many, make a difference or simply make you feel great about your
            contribution to humanity. Whatever your reason, whatever your motivation, we welcome you to learn
            more about eligibility and the benefits of donating blood with a trusted organization like us.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mt-4">
        <form className="blood-request-form p-3 shadow bg-white rounded" onSubmit={handleSubmit}>
          <h5 className="mb-3 text-danger fw-bold text-center">Blood Donate Form</h5>

          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
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

          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="tel"
              className={`form-control ${error ? "is-invalid" : ""}`}
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            {error && <div className="text-danger mt-1">{error}</div>}
          </div>

          <button type="submit" className="btn btn-danger w-100" disabled={error}>
            Submit Information
          </button>
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