import React, { useState, useEffect } from "react";
import BloodRequestForm from "./BloodRequestForm";
import RequestList from "./RequestList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bloodRequest.css";

const BloodRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const response = await fetch("http://localhost:5000/api/bloodRequests");
    const data = await response.json();
    setRequests(data);
  };

  return (
    <>
      {/* Navbar */}
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <div className="container">
            <a className="navbar-brand fw-bold fs-4" href="/">ASAP Health Care Service</a>
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
                  <a className="nav-link text-white" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/donate">Donate Blood</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/request">Request Blood</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Page Content */}
      <div className="container mt-4">
        <h2 className="text-center text-danger fw-bold mb-4">Blood Donation Requests</h2>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <BloodRequestForm refreshRequests={fetchRequests} />
          </div>
          <div className="col-lg-6">
            <RequestList requests={requests} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodRequest;
