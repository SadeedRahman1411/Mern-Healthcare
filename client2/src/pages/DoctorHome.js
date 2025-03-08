import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DoctorHome.css";
import doctorhme1 from "./doctorhome/doctorhome1.webp";
import doctorhme2 from "./doctorhome/doctorhome2.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function DoctorHome() {
  const [filters, setFilters] = useState({
    speciality: "",
    location: "",
    availability: "",
    gender: "",
    onlineConsultation: false,
    homeVisit: false,
    insuranceAccepted: false,
  });

  const handleFilterChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

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
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <span className="navbar-brand inactive-link">
            ASAP Health Care Service
          </span>
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
                <Link className="btn btn-outline-primary ms-2" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center mb-4">Choose a package that suits your need</h2>

        <section className="container py-4 bg-light rounded shadow-sm">
          <h3 className="text-center mb-4">Find the Right Doctor for You</h3>
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="speciality" className="form-label">Speciality</label>
              <select className="form-select" id="speciality" value={filters.speciality} onChange={handleFilterChange}>
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
              <label htmlFor="location" className="form-label">Location</label>
              <select className="form-select" id="location" value={filters.location} onChange={handleFilterChange}>
                <option value="">All Locations</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="khulna">Khulna</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="sylhet">Sylhet</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="availability" className="form-label">Availability</label>
              <select className="form-select" id="availability" value={filters.availability} onChange={handleFilterChange}>
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This Week</option>
                <option value="weekend">Weekend</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select className="form-select" id="gender" value={filters.gender} onChange={handleFilterChange}>
                <option value="">Any Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DoctorHome;