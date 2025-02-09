import React from "react";
import { Link } from "react-router-dom";
import "./ContactUs.css";

// Import developer images
import dev1 from "./developers/abir.jpg";
import dev2 from "./developers/pias.jpg";
import dev3 from "./developers/sadeed.jpg";

const developers = [
  {
    name: "Ariyan Islam Abir",
    email: "ariyan.cse.20220204083@aust.edu",
    studentId: "20220204083",
    img: dev1,
  },
  {
    name: "Sayem (Monkey) Pias",
    email: "sayem.cse.20220204100@aust.edu",
    studentId: "20220204100",
    img: dev2,
  },
  {
    name: "Sadeed Rahman",
    email: "sadeed.cse.20220204081@aust.edu",
    studentId: "20220204081",
    img: dev3,
  },
];

const ContactUs = () => {
  return (
    <div className="contactus">
      {/* Simplified Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ASAP Health Care Service
          </Link>
          <div className="ms-auto">
            <Link className="btn btn-outline-primary" to="/login">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* New Heading: Get in touch with our team */}
      <section className="container py-3 text-center">
        <h2>Get in touch with our team</h2>
      </section>

      {/* Contact Information Section */}
      <section className="container py-5">
        <div className="row g-4">
          {/* Partnership */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title red-header">For Partnership</h3>
                <p className="mb-1"><strong>Sultan Ahmed</strong></p>
                <p className="mb-1">Deputy Secretary General</p>
                <p className="mb-0">Email: sultan.ahmed@bdrcs.org</p>
              </div>
            </div>
          </div>

          {/* Media Enquiries */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title">Media Enquiries</h3>
                <p className="mb-1"><strong>Areefa Mehra Sinha</strong></p>
                <p className="mb-1">E-mail: areefa.sinha@bdrcs.org Or, info@bdrcs.org</p>
                <p className="mb-0">Mobile: 01894 815516</p>
              </div>
            </div>
          </div>

          {/* Donate */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title">To Donate Us</h3>
                <p className="mb-1"><strong>Shahana Zafor</strong></p>
                <p className="mb-1">Email: Shahana.Zafor@bdrcs.org</p>
                <p className="mb-0">Mobile: +88 01811458532</p>
              </div>
            </div>
          </div>

          {/* Membership */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title">To Be a Member</h3>
                <p className="mb-1"><strong>Ekram Elahi Chowdhury</strong></p>
                <p className="mb-1">ekram.elahi@bdrcs.org</p>
                <p className="mb-0">Mobile: 880 01811 458517</p>
              </div>
            </div>
          </div>

          {/* Volunteer */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title">To Be a Volunteer</h3>
                <p className="mb-1">Please call BDRCS Toll Free</p>
                <p className="mb-1">Hotline Number- <span className="text-success">16226</span></p>
                <p className="mb-0">(From 9 am – 4 pm)</p>
              </div>
            </div>
          </div>

          {/* Training */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title">Request for Training</h3>
                <p className="mb-1"><strong>Ekram Elahi Chowdhury</strong></p>
                <p className="mb-1">Email: ekram.elahi@bdrcs.org</p>
                <p className="mb-1">Mobile: +88 018 11 458517</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Info Section */}
      <section className="container py-5 text-center">
        <div className="row g-4">
          {developers.map((dev, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card shadow-sm h-100">
                <img src={dev.img} className="card-img-top" alt={dev.name} />
                <div className="card-body">
                  <h5 className="card-title">{dev.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {dev.email}
                  </p>
                  <p className="card-text">
                    <strong>Student ID:</strong> {dev.studentId}
                  </p>
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

export default ContactUs;