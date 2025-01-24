import React from "react";
import "./AmbulanceService.css"; // Custom CSS for AmbulanceService
import { Link } from "react-router-dom"; // React Router for navigation
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (optional)

// Importing images
import acAmbulance from "./ambulanceservice/ambulance2.jpg";
import icuAmbulance from "./ambulanceservice/ambulance3.webp";
import emergencyAmbulance from "./ambulanceservice/ambulance4.webp";

const AmbulanceService = () => {
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
        <div className="search-bar mx-auto d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search ambulance types or services..."
          />
          <button className="btn btn-primary">Search</button>
        </div>
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
                  <Link to="/" className="btn btn-outline-primary">
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
        <h2 className="text-center text-primary mb-4">Request an Ambulance</h2>
        <form id="ambulance-form" className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label htmlFor="fromLocation" className="form-label">
              From Location
            </label>
            <input
              type="text"
              className="form-control"
              id="fromLocation"
              placeholder="Enter starting location"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="toLocation" className="form-label">
              To Destination
            </label>
            <input
              type="text"
              className="form-control"
              id="toLocation"
              placeholder="Enter destination"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ambulanceType" className="form-label">
              Ambulance Type
            </label>
            <select className="form-select" id="ambulanceType">
              <option>AC Ambulance</option>
              <option>ICU Ambulance</option>
              <option>Emergency Ambulance</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date & Time
            </label>
            <input type="datetime-local" className="form-control" id="date" />
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
