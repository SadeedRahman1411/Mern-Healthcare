import React, { useState } from "react";
import "./ChamberAppointment.css"; // Custom CSS for ChamberAppointment
import { Link } from "react-router-dom"; // React Router for navigation
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (optional)

const ChamberAppointment = () => {
  const doctors = [
    {
      name: "Dr. Anirban Ghose",
      specialization: "Cardiologist",
      experience: "20 Years of Experience",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Dr. Ishita Roy",
      specialization: "Dermatologist",
      experience: "12 Years of Experience",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Dr. Rahat Hossain",
      specialization: "Neurologist",
      experience: "15 Years of Experience",
      img: "https://via.placeholder.com/150",
    },
  ];

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
    <div className="chamber-appointment">
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
        <h1 className="display-5 fw-bold">Book a Chamber Appointment</h1>
        <p className="lead">
          Find and book your preferred doctor for a personalized consultation.
          Trusted professionals, seamless scheduling, and on-time appointments.
        </p>
      </header>

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

      {/* Doctor List Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4 text-primary">Available Doctors</h2>
        <div className="row g-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card shadow-sm h-100">
                <img
                  src={doctor.img}
                  className="card-img-top"
                  alt={doctor.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text">
                    {doctor.specialization} <br />
                    {doctor.experience}
                  </p>
                  <Link to="/chamberapp" className="btn btn-outline-primary">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Request Form */}
      <section className="form-section container py-5">
        <h2 className="text-center text-primary mb-4">Request an Appointment</h2>
        <form
          id="appointment-form"
          className="mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <div className="mb-3">
            <label htmlFor="doctorName" className="form-label">
              Doctor Name
            </label>
            <input
              type="text"
              className="form-control"
              id="doctorName"
              placeholder="Enter doctor name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="appointmentDate" className="form-label">
              Date & Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="appointmentDate"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="patientName" className="form-label">
              Patient Name
            </label>
            <input
              type="text"
              className="form-control"
              id="patientName"
              placeholder="Enter your name"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit Request
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p className="mb-0">
          &copy; 2025 ASAP Health Care Service. All Rights Reserved.
        </p>
        <p className="mb-0">
          We are on a mission to make quality healthcare affordable and
          accessible for the people of Bangladesh.
        </p>
      </footer>
    </div>
  );
};

export default ChamberAppointment;