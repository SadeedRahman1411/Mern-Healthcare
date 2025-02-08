import React, { useState } from "react";
import "./bloodRequestForm.css";

const BloodRequestForm = ({ refreshRequests }) => {
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    location: "",
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
      setFormData({ name: "", bloodType: "", location: "", contact: "" });
      refreshRequests();
    }
  };

  return (
    <>
      <form className="blood-request-form p-3 shadow bg-white rounded" onSubmit={handleSubmit}>
        <h5 className="mb-3 text-danger fw-bold">Request Blood</h5>
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
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="tel"
            className="form-control"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">
          Submit Request
        </button>
      </form>
    </>
  );
};

export default BloodRequestForm;
