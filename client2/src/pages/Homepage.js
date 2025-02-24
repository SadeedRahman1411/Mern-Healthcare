import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS

// Importing images
import videoCalling from "./homepage/videoCalling.jpg";
import chamber from "./homepage/chamber.jpg";
import doctorHome from "./homepage/doctor_home.jpg";
import ambulance from "./homepage/ambulace.jpg";
import bloodDonation from "./homepage/blood_donation.jpg";

// Services array with unique paths
const services = [
  {
    title: "Video Consultancy",
    description: "Consult with the best doctors through video call.",
    img: videoCalling,
    path: "/", // Unique link for this service
  },
  {
    title: "Chamber Appointment",
    description: "Book your appointment easily with a few clicks.",
    img: chamber,
    path: "/chamberapp", // Unique link for this service
  },
  {
    title: "Doctor At Your Home",
    description: "Book a doctor to visit you at home.",
    img: doctorHome,
    path: "/doctorhome", // Unique link for this service
  },
  {
    title: "Ambulance Service",
    description: "24/7 Emergency Ambulance Service.",
    img: ambulance,
    path: "/ambulanceservice", // Unique link for this service
  },
  {
    title: "Blood Donation",
    description: "Donate blood and save lives. Schedule your donation easily.",
    img: bloodDonation,
    path: "/bloodreq", // Unique link for this service
  },
];

const Homepage = () => {
  const navigate = useNavigate(); // Added navigate hook
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const token = localStorage.getItem("token") || sessionStorage.getItem("token"); // Check if the user is logged in

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true); // Set login state to true if token exists
    }
  }, [token]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token"); // In case the token is stored in sessionStorage
    setIsLoggedIn(false); // Set login state to false after logout
  };

  // Handle Sign In button click (Redirect to login page)
  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="homepage">
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
                <Link className="nav-link" to="/faq">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctorhome">
                  Find Doctor
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ambulanceservice">
                  Find Ambulance
                </Link>
              </li>

              {/* Conditionally render Sign In or Logout */}
              {!isLoggedIn ? (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary ms-2"
                    onClick={handleSignIn}
                    disabled={isLoggedIn} // Disable Sign In button when logged in
                  >
                    Sign In
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={handleLogout}
                    disabled={!isLoggedIn} // Disable Logout button when not logged in
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container text-center py-5">
        <h1 className="display-5 fw-bold">Book a Doctor's Appointment in Just 10 Minutes</h1>
        <p className="lead">
          Say goodbye to endless phone calls and long queues. Book doctors'
          appointments, video consultations, ambulance services, manage medical
          records, and more. Take the first step towards better health.
        </p>
        <div className="search-bar mx-auto d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search doctors, hospitals, clinics..."
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </header>

      {/* Services Section */}
      <section className="container py-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card shadow-sm h-100">
                <img
                  src={service.img}
                  className="card-img-top"
                  alt={service.title}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <Link to={service.path} className="btn btn-outline-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
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

export default Homepage;
