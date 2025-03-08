import React, { useState, useEffect } from "react";
import "./AmbulanceService.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

// Importing images
import acAmbulance from "./ambulanceservice/ambulance2.jpg";
import icuAmbulance from "./ambulanceservice/ambulance3.webp";
import emergencyAmbulance from "./ambulanceservice/ambulance4.webp";

const AmbulanceService = () => {
  const [selectedAmbulanceType, setSelectedAmbulanceType] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactError, setContactError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [testUserId, setTestUserId] = useState("");
  const [testUserType, setTestUserType] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          console.log("no token");
          return;
        }

        const res = await axios.get("/api/v1/user/getUserInfo", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          setTestUserId(res.data.user._id);
          setTestUserType(res.data.user.userType);
        } else {
          console.log("fetch fail");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  // Bangladesh cities and areas data
  const citiesAndAreas = {
    Dhaka: [
      "Mirpur", "Uttara", "Dhanmondi", "Gulshan", "Banani", "Mohammadpur", "Motijheel", "Badda"
    ],
    Chittagong: [
      "Agrabad", "Nasirabad", "Khulshi", "Halishahar", "Patenga", "GEC Circle", "Chawkbazar"
    ],
    Rajshahi: [
      "Boalia", "Motihar", "Rajpara", "Shaheb Bazar", "Upashahar", "Kazla"
    ],
    Khulna: [
      "Sonadanga", "Boyra", "Khalishpur", "Daulatpur", "Gollamari", "Khan Jahan Ali"
    ],
    Sylhet: [
      "Zindabazar", "Ambarkhana", "Upashahar", "Shibganj", "Subidbazar", "Tilagor"
    ],
    Barisal: [
      "Notullabad", "Rupatali", "Amanatganj", "Chor Kaua", "Sadar Road", "Kashipur"
    ],
    Rangpur: [
      "Modern More", "Dhap", "Shapla Chottor", "R.K. Road", "Jahaj Company More"
    ],
    Mymensingh: [
      "Ganginar Par", "Maskanda", "Chorpara", "Valuka", "Kalibari"
    ],
  };

  // Update areas when city changes
  useEffect(() => {
    if (selectedCity) {
      const newAreas = citiesAndAreas[selectedCity] || [];
      setAreas(newAreas);
      setSelectedArea("");
    } else {
      setAreas([]);
    }
  }, [selectedCity]);

  const validateContactNumber = (number) => {
    if (!/^\d+$/.test(number)) {
      return "Only numbers are allowed.";
    }
    if (!number.startsWith("01")) {
      return "Number must start with '01'.";
    }
    if (number.length !== 11) {
      return "Number must be 11 digits long.";
    }
    return "";
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setContactNumber(value);
      const error = validateContactNumber(value);
      setContactError(error);
      if (!error) {
        setFormErrors((prevErrors) => ({ ...prevErrors, contactNumber: "" }));
      }
    }
  };

  const handleAmbulanceTypeChange = (e) => {
    const value = e.target.value;
    setSelectedAmbulanceType(value);
    if (value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, ambulanceType: "" }));
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCity(value);
    if (value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
    }
  };

  const handleAreaChange = (e) => {
    const value = e.target.value;
    setSelectedArea(value);
    if (value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, area: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!selectedAmbulanceType) {
      errors.ambulanceType = "Ambulance Type is required.";
    }
    if (!contactNumber) {
      errors.contactNumber = "Contact Number is required.";
    } else if (contactError) {
      errors.contactNumber = contactError;
    }
    if (!selectedCity) {
      errors.city = "City is required.";
    }
    if (!selectedArea) {
      errors.area = "Area is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        console.log("Submitting Ambulance Request with:");
        console.log("  City:", selectedCity);
        console.log("  Area:", selectedArea);
        console.log("  Ambulance Type:", selectedAmbulanceType);
        console.log("  Contact Number:", contactNumber);
        console.log("  User ID:", testUserId);
        console.log("  User Type:", testUserType);

        const response = await axios.post(
          "/api/v1/user/ambulance/register",
          {
            city: selectedCity,
            area: selectedArea,
            ambulanceType: selectedAmbulanceType,
            contactNumber: contactNumber,
            createdBy: testUserId,
            createdByType: testUserType,
            userId: testUserId,
            userType: testUserType
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }
        );
        if (response.data.success) {
          alert("Ambulance request submitted successfully!");
          setSelectedCity("");
          setSelectedArea("");
          setSelectedAmbulanceType("");
          setContactNumber("");
        } else {
          console.error("Failed to submit the request:", response.data);
          alert(`Failed to submit the request: ${response.data.message || "Unknown error"}. Please try again.`);
        }
      } catch (error) {
        console.error("Error submitting the form:", error.response ? error.response.data : error.message);
        alert(`An error occurred: ${error.response ? error.response.data.message : error.message}. Please try again.`);
      }
    }
  };

  return (
    <div className="ambulance-service">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ASAP Health Care Service
          </Link>
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
                <Link className="btn btn-outline-primary ms-2" to="/login">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container text-center py-5">
        <h1 className="display-5 fw-bold">24/7 Emergency Ambulance Service</h1>
        <p className="lead">
          Rent a prompt, high-quality ambulance for your emergency needs.
          Trusted drivers, certified services, and on-time guarantee.
        </p>
      </header>

      {/* Ambulance Types Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4 text-primary">Ambulance Services We Offer</h2>
        <div className="row g-4">
          {
            [{
                title: "AC Ambulance",
                description: "Best for transferring patients nearby, equipped with basic life support.",
                img: acAmbulance,
                type: "acAmbulance"
              },
              {
                title: "ICU Ambulance",
                description: "Specialized ambulance for critical patients requiring intensive care.",
                img: icuAmbulance,
                type: "icuAmbulance"
              },
              {
                title: "Emergency Ambulance",
                description: "Available 24/7 for urgent medical transportation across the city.",
                img: emergencyAmbulance,
                type: "emergencyAmbulance"
              }
            ].map((ambulance, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card shadow-sm h-100">
                  <img
                    src={ambulance.img}
                    className="card-img-top"
                    alt={ambulance.title}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{ambulance.title}</h5>
                    <p className="card-text">{ambulance.description}</p>
                    <Link to={`/ambulance-list`} className="btn btn-outline-primary">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* Request Form Section */}
      <section className="form-section container py-5">
        <h2 className="text-center text-primary mb-4">Register an Ambulance</h2>
        <form
          id="ambulance-form"
          className="mx-auto"
          style={{ maxWidth: "600px" }}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* City */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <select
              className={`form-select ${formErrors.city ? "is-invalid" : ""}`}
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
              required
            >
              <option value="">Select City</option>
              {Object.keys(citiesAndAreas).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {formErrors.city && (
              <div className="invalid-feedback">{formErrors.city}</div>
            )}
          </div>

          {/* Area */}
          <div className="mb-3">
            <label htmlFor="area" className="form-label">
              Area
            </label>
            <select
              className={`form-select ${formErrors.area ? "is-invalid" : ""}`}
              id="area"
              value={selectedArea}
              onChange={handleAreaChange}
              disabled={!selectedCity}
              required
            >
              <option value="">Select Area</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select>
            {formErrors.area && (
              <div className="invalid-feedback">{formErrors.area}</div>
            )}
          </div>

          {/* Ambulance Type */}
          <div className="mb-3">
            <label htmlFor="ambulanceType" className="form-label">
              Ambulance Type
            </label>
            <select
              className={`form-select ${formErrors.ambulanceType ? "is-invalid" : ""}`}
              id="ambulanceType"
              value={selectedAmbulanceType}
              onChange={handleAmbulanceTypeChange}
              required
            >
              <option value="">Select Ambulance Type</option>
              <option value="acAmbulance">AC Ambulance</option>
              <option value="icuAmbulance">ICU Ambulance</option>
              <option value="emergencyAmbulance">Emergency Ambulance</option>
            </select>
            {formErrors.ambulanceType && (
              <div className="invalid-feedback">{formErrors.ambulanceType}</div>
            )}
          </div>

          {/* Contact Number */}
          <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              className={`form-control ${formErrors.contactNumber ? "is-invalid" : ""}`}
              value={contactNumber}
              onChange={handleContactNumberChange}
              required
            />
            {formErrors.contactNumber && (
              <div className="invalid-feedback">{formErrors.contactNumber}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit Request
          </button>
        </form>
      </section>
    </div>
  );
};

export default AmbulanceService;