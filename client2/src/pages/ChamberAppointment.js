import React from "react";
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
        <div className="search-bar mx-auto d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search doctor by name or specialization..."
            aria-label="Search"
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </header>

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
        <form id="appointment-form" className="mx-auto" style={{ maxWidth: "600px" }}>
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
  <p className="mb-0">&copy; 2025 ASAP Health Care Service. All Rights Reserved.</p>
  <p className="mb-0">
    We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
  </p>
</footer>

    </div>
  );
};

export default ChamberAppointment;
