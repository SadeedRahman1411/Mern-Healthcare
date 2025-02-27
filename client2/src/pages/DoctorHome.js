import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DoctorHome.css"; // Custom CSS file for additional styling
import doctorhme1 from "./doctorhome/doctorhome1.webp"; // Import image 1
import doctorhme2 from "./doctorhome/doctorhome2.jpg"; // Import image 2
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (optional)

function DoctorHome() {
  // State for filters
  const [filters, setFilters] = useState({
    speciality: "",
    location: "",
    availability: "",
    gender: "",
    onlineConsultation: false,
    homeVisit: false,
    insuranceAccepted: false,
  });

  // Handler for filter changes
  const handleFilterChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler to reset filters
  const resetFilters = () => {
    setFilters({
      speciality: "",
      location: "",
      availability: "",
      gender: "",
      onlineConsultation: false,
      homeVisit: false,
      insuranceAccepted: false,
    });
    document.getElementById("speciality").value = "";
    document.getElementById("location").value = "";
    document.getElementById("availability").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("onlineConsultation").checked = false;
    document.getElementById("homeVisit").checked = false;
    document.getElementById("insuranceAccepted").checked = false;
  };

  return (
    <div className="App">
      {/* Simplified Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            ASAP Health Care Service
          </a>
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
                <a className="btn btn-outline-primary ms-2" href="/login">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        {/* Heading */}
        <h2 className="text-center mb-4">Choose a package that suits your need</h2>

        {/* Filter Section */}
        <section className="container py-4 bg-light rounded shadow-sm">
          <h3 className="text-center mb-4">Find the Right Doctor for You</h3>
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="speciality" className="form-label">
                Speciality
              </label>
              <select
                className="form-select"
                id="speciality"
                value={filters.speciality}
                onChange={handleFilterChange}
              >
                <option value="">All Specialities</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="psychiatry">Psychiatry</option>
                <option value="gynecology">Gynecology</option>
                <option value="ophthalmology">Ophthalmology</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <select
                className="form-select"
                id="location"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="">All Locations</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="khulna">Khulna</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="sylhet">Sylhet</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="availability" className="form-label">
                Availability
              </label>
              <select
                className="form-select"
                id="availability"
                value={filters.availability}
                onChange={handleFilterChange}
              >
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This Week</option>
                <option value="weekend">Weekend</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                value={filters.gender}
                onChange={handleFilterChange}
              >
                <option value="">Any Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="col-md-12 mt-4 text-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onlineConsultation"
                  checked={filters.onlineConsultation}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="onlineConsultation">
                  Online Consultation Available
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="homeVisit"
                  checked={filters.homeVisit}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="homeVisit">
                  Home Visit Available
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="insuranceAccepted"
                  checked={filters.insuranceAccepted}
                  onChange={handleFilterChange}
                />
                <label className="form-check-label" htmlFor="insuranceAccepted">
                  Insurance Accepted
                </label>
              </div>
            </div>
            <div className="col-12 text-center mt-3">
              <button className="btn btn-primary px-4">Find Doctors</button>
              <button
                className="btn btn-outline-secondary ms-2"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </section>

        {/* Cards Section with Gap */}
        <div className="cards-section">
          <div className="row">
            {/* Card 1 */}
            <div className="col-md-6 mb-4">
              <div className="card h-100 custom-card">
                <img
                  src={doctorhme1}
                  className="card-img-top custom-card-img"
                  alt="Doctor at home"
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">On Demand Doctor at Home!</h5>
                  <h6 className="card-subtitle mb-2 text-muted">৳ 1200</h6>
                  <p className="card-text">
                    If you need a primary care or when you/someone close is unwell, call an experienced MBBS doctor to your home for inspection.
                    <ul>
                      <li>Single Visit</li>
                      <li>Visit Duration: Max 20 minutes</li>
                      <li>Basic health vitals check</li>
                      <li>90 minutes arrival time needed</li>
                    </ul>
                  </p>
                  <button className="btn btn-primary">Request this package</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-6 mb-4">
              <div className="card h-100 custom-card">
                <img
                  src={doctorhme2}
                  className="card-img-top custom-card-img"
                  alt="Home care"
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">Home Centric Primary Care!</h5>
                  <h6 className="card-subtitle mb-2 text-muted">৳ 4999</h6>
                  <p className="card-text">
                    ASAP Health Care Service offers "Home-Centric Primary Care," where a doctor and physiotherapist visit patients weekly.
                    <ul>
                      <li>Monthly 4 visits</li>
                      <li>1 MBBS Doctor & 1 Physiotherapist</li>
                      <li>Visit Duration: 30 minutes</li>
                      <li>Basic health vitals check included</li>
                    </ul>
                  </p>
                  <button className="btn btn-primary">Request this package</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p className="mb-0">&copy; 2025 ASAP Health Care Service. All Rights Reserved.</p>
        <p className="mb-0">
          We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
        </p>
      </footer>
    </div>
  );
}

export default DoctorHome;