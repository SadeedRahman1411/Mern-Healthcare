// ChamberAppointment.js
import React, { useEffect, useState } from "react";
import "./ChamberAppointment.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

const ChamberAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [bookedDoctors, setBookedDoctors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/v1/user/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setDoctors(response.data.doctors);
        } else {
          console.error("Error fetching doctors:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/api/v1/user/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          const booked = {};
          response.data.appointments.forEach((appointment) => {
            // Mark as booked if status is "pending" or "confirmed"
            if (appointment.status === "pending" || appointment.status === "confirmed") {
              booked[appointment.doctorId] = true;
            }
          });
          setBookedDoctors(booked);
        } else {
          console.error("Error fetching appointments:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, []);

  const handleBookAppointment = async (doctorId) => {
    const confirmBooking = window.confirm("Do you want to book this appointment?");
    if (confirmBooking) {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await axios.post(
          "/api/v1/user/book-appointment",
          { doctorId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          setBookedDoctors((prev) => ({ ...prev, [doctorId]: true }));
          alert("Appointment booked successfully! Your request is pending.");
        } else {
          console.error("Booking error:", response.data.message);
          alert("There was an issue booking your appointment. Please try again.");
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="chamber-appointment">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">ASAP Health Care Service</Link>
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
                <Link className="btn btn-outline-primary ms-2" to="/login">Sign In</Link>
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

      {/* Doctor List Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4 text-primary">Available Doctors</h2>
        <div className="row g-4">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {doctor.email} <br />
                    <strong>Specialization:</strong> {doctor.specialistIn} <br />
                    <strong>Degree:</strong> {doctor.degree} <br />
                    <strong>Contact Number:</strong> {doctor.contactNumber}
                  </p>
                  <button
                    className={`btn ${bookedDoctors[doctor._id] ? "btn-success" : "btn-outline-primary"}`}
                    onClick={() => handleBookAppointment(doctor._id)}
                    disabled={!!bookedDoctors[doctor._id]}
                  >
                    {bookedDoctors[doctor._id] ? "Booked" : "Book Appointment"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p className="mb-0">© 2025 ASAP Health Care Service. All Rights Reserved.</p>
        <p className="mb-0">
          We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
        </p>
      </footer>
    </div>
  );
};

export default ChamberAppointment;
