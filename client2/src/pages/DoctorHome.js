import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorHome.css'; // Custom CSS file for additional styling
import doctorhme1 from "./doctorhome/doctorhome1.webp"; // Import image 1
import doctorhme2 from "./doctorhome/doctorhome2.jpg"; // Import image 2
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (optional)

function DoctorHome() {
  return (
    <div className="App">
      {/* Simplified Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/">ASAP Health Care Service</a>
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
                <a className="btn btn-outline-primary ms-2" href="/login">Sign In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        {/* Heading */}
        <h2 className="text-center mb-4">Choose a package that suits your need</h2>

        {/* Cards */}
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <img src={doctorhme1} className="card-img-top" alt="Doctor at home" />
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
            <div className="card h-100">
              <img src={doctorhme2} className="card-img-top" alt="Home care" />
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