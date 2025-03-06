import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./bloodRequestForm.css";

const BloodRequestForm = ({ refreshRequests }) => {
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    city: "",
    area: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [areaError, setAreaError] = useState("");
  const [areas, setAreas] = useState([]);

  const navigate = useNavigate();

  const citiesAndAreas = {
    Dhaka: [
      "Mirpur",
      "Uttara",
      "Dhanmondi",
      "Gulshan",
      "Banani",
      "Mohammadpur",
      "Motijheel",
      "Badda",
    ],
    Chittagong: [
      "Agrabad",
      "Nasirabad",
      "Khulshi",
      "Halishahar",
      "Patenga",
      "GEC Circle",
      "Chawkbazar",
    ],
    Rajshahi: [
      "Boalia",
      "Motihar",
      "Rajpara",
      "Shaheb Bazar",
      "Upashahar",
      "Kazla",
    ],
    Khulna: [
      "Sonadanga",
      "Boyra",
      "Khalishpur",
      "Daulatpur",
      "Gollamari",
      "Khan Jahan Ali",
    ],
    Sylhet: [
      "Zindabazar",
      "Ambarkhana",
      "Upashahar",
      "Shibganj",
      "Subidbazar",
      "Tilagor",
    ],
    Barisal: [
      "Notullabad",
      "Rupatali",
      "Amanatganj",
      "Chor Kaua",
      "Sadar Road",
      "Kashipur",
    ],
    Rangpur: [
      "Modern More",
      "Dhap",
      "Shapla Chottor",
      "R.K. Road",
      "Jahaj Company More",
    ],
    Mymensingh: [
      "Ganginar Par",
      "Maskanda",
      "Chorpara",
      "Valuka",
      "Kalibari",
    ],
  };

  useEffect(() => {
    setAreas(citiesAndAreas[formData.city] || []);
    setFormData((prev) => ({ ...prev, area: "" }));
    setAreaError("");
  }, [formData.city]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "contact") {
      validateContact(value);
    }

    if (name === "city") {
      return;
    }

    if (name === "area") {
      if (!value) {
        setAreaError("Please select an area.");
      } else {
        setAreaError("");
      }
    }
  };

  const validateContact = (contact) => {
    const contactPattern = /^01\d{9}$/;
    if (!contactPattern.test(contact)) {
      setError("Contact number must be 11 digits and start with '01'.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.area) {
      setAreaError("Please select an area.");
      return;
    }

    if (error || areaError) return;

    console.log("Submitting Form with data:", formData);

    const response = await fetch("/api/v1/user/bloodRequests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log("Fetch API responded with status:", response.status);

    if (response.ok) {
      setFormData({ name: "", bloodType: "", city: "", area: "", contact: "" });
      setAreaError("");
      alert("Info Registered");
      navigate("/bloodreq");
      if (refreshRequests) {
        refreshRequests();
      }
    } else {
      console.error("Form Submission failed with status:", response.status);
      const errorText = await response.text();
      console.error("Detailed Error From API", errorText);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/">
            ASAP Health Care Service
          </a>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="blood-donation-message p-3 bg-light">
          <h4 className="text-danger fw-bold">BLOOD DONOR</h4>
          <p>
            Across Bangladesh, every day there remains an urgent need for all
            types of blood groups. Especially donors with rare blood groups such
            as O Negative, B Negative, and A Negative are in high demand. Your
            timely response is essential to the supply of healthy blood for the
            massive daily demand we face.
          </p>
          <p>
            Your donation can save the lives of many, make a difference or
            simply make you feel great about your contribution to humanity.
            Whatever your reason, whatever your motivation, we welcome you to
            learn more about eligibility and the benefits of donating blood with
            a trusted organization like us.
          </p>
        </div>
      </div>

      <div className="container mt-4">
        <form
          className="blood-request-form p-3 shadow bg-white rounded"
          onSubmit={handleSubmit}
        >
          <h5 className="mb-3 text-danger fw-bold text-center">
            Blood Donate Form
          </h5>

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
            <select
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Barisal">Barisal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
          </div>

          <div className="mb-2">
            <select
              className={`form-control ${areaError ? "is-invalid" : ""}`}
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            >
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            {areaError && <div className="text-danger mt-1">{areaError}</div>}
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

          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={error || areaError}
          >
            Submit Information
          </button>
        </form>
      </div>

      <footer className="bg-danger text-white text-center py-3 mt-4">
        <p className="mb-0">
          © 2025 ASAP Health Care Service. All Rights Reserved.
        </p>
        <p className="mb-0">
          We are on a mission to make quality healthcare affordable and
          accessible for the people of Bangladesh.
        </p>
      </footer>
    </>
  );
};

export default BloodRequestForm;