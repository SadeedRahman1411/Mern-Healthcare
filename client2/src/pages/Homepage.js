import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
    path: "/",
  },
  {
    title: "Chamber Appointment",
    description: "Book your appointment easily with a few clicks.",
    img: chamber,
    path: "/chamberapp",
  },
  {
    title: "Doctor At Your Home",
    description: "Book a doctor to visit you at home.",
    img: doctorHome,
    path: "/doctorhome",
  },
  {
    title: "Ambulance Service",
    description: "24/7 Emergency Ambulance Service.",
    img: ambulance,
    path: "/ambulanceservice",
  },
  {
    title: "Blood Donation",
    description: "Donate blood and save lives. Schedule your donation easily.",
    img: bloodDonation,
    path: "/bloodreq",
  },
];

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

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

              {/* Conditionally render Sign In or Profile */}
              {!isLoggedIn ? (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary ms-2"
                    onClick={handleSignIn}
                    disabled={isLoggedIn}
                  >
                    Sign In
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/profile" className="btn btn-outline-success ms-2">
                    Profile
                  </Link>
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
          Say goodbye to endless phone calls and long queues. Book doctors' appointments, video consultations, ambulance services, manage medical records, and more. Take the first step towards better health.
        </p>
      </header>

      {/* Services Section */}
      <section className="container py-5">
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card shadow-sm h-100">
                <img src={service.img} className="card-img-top" alt={service.title} />
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
