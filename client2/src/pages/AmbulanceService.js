import React, { useState, useEffect } from "react";
import "./AmbulanceService.css"; // Custom CSS for AmbulanceService
import { Link } from "react-router-dom"; // React Router for navigation
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (optional)

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

  // Bangladesh cities and areas data
  const citiesAndAreas = {
    Dhaka: ["Mirpur", "Uttara", "Dhanmondi", "Gulshan", "Banani", "Mohammadpur", "Motijheel", "Badda"],
    Chittagong: ["Agrabad", "Nasirabad", "Khulshi", "Halishahar", "Patenga", "GEC Circle", "Chawkbazar"],
    Rajshahi: ["Boalia", "Motihar", "Rajpara", "Shaheb Bazar", "Upashahar", "Kazla"],
    Khulna: ["Sonadanga", "Boyra", "Khalishpur", "Daulatpur", "Gollamari", "Khan Jahan Ali"],
    Sylhet: ["Zindabazar", "Ambarkhana", "Upashahar", "Shibganj", "Subidbazar", "Tilagor"],
    Barisal: ["Notullabad", "Rupatali", "Amanatganj", "Chor Kaua", "Sadar Road", "Kashipur"],
    Rangpur: ["Modern More", "Dhap", "Shapla Chottor", "R.K. Road", "Jahaj Company More"],
    Mymensingh: ["Ganginar Par", "Maskanda", "Chorpara", "Valuka", "Kalibari"],
  };

  // Update areas when city changes
  useEffect(() => {
    if (selectedCity) {
      setAreas(citiesAndAreas[selectedCity] || []);
      setSelectedArea("");
    } else {
      setAreas([]);
    }
  }, [selectedCity]);

  const handleBookNowClick = (ambulanceType) => {
    setSelectedAmbulanceType(ambulanceType);
  };

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
    return ""; // No error
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setContactNumber(value);
      const error = validateContactNumber(value);
      setContactError(error);
      // Clear the error if the input is valid
      if (!error) {
        setFormErrors((prevErrors) => ({ ...prevErrors, contactNumber: "" }));
      }
    }
  };

  const handleAmbulanceTypeChange = (e) => {
    const value = e.target.value;
    setSelectedAmbulanceType(value);
    // Clear the error if the input is valid
    if (value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, ambulanceType: "" }));
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCity(value);
    // Clear the error if the input is valid
    if (value) {
      setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
    }
  };

  const handleAreaChange = (e) => {
    const value = e.target.value;
    setSelectedArea(value);
    // Clear the error if the input is valid
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
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // If validation passes, proceed with form submission
      alert("Form submitted successfully!");
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
          {[
            {
              title: "AC Ambulance",
              description:
                "Best for transferring patients nearby, equipped with basic life support.",
              img: acAmbulance,
            },
            {
              title: "ICU Ambulance",
              description:
                "Specialized ambulance for critical patients requiring intensive care.",
              img: icuAmbulance,
            },
            {
              title: "Emergency Ambulance",
              description:
                "Available 24/7 for urgent medical transportation across the city.",
              img: emergencyAmbulance,
            },
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
                  <Link
                    to="/"
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation
                      handleBookNowClick(ambulance.title);
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
          noValidate // Disable HTML5 validation to use custom validation
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
              {areas.map((area) => (
                <option key={area} value={area}>
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
              <option value="">Please select an item in the list.</option>
              <option>AC Ambulance</option>
              <option>ICU Ambulance</option>
              <option>Emergency Ambulance</option>
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
              className={`form-control ${formErrors.contactNumber ? "is-invalid" : ""}`}
              id="contactNumber"
              placeholder="Enter your contact number (e.g., 01123456789)"
              value={contactNumber}
              onChange={handleContactNumberChange}
              required
            />
            {formErrors.contactNumber && (
              <div className="invalid-feedback">{formErrors.contactNumber}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit Request
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p className="mb-0">&copy; 2025 ASAP Health Care Service. All Rights Reserved.</p>
        <p className="mb-0">
          We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
        </p>
      </footer>
    </div>
  );
};

export default AmbulanceService;