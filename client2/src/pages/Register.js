import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());

      if (res.data.success) {
        alert("Registered Successfully!");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Registration Error:", error);
      alert("Something Went Wrong");
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ASAP Health Care Service
          </Link>
        </div>
      </nav>

      {/* Register Form */}
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <h3 className="text-center">Register</h3>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">User Type</label>
              <select name="userType" className="form-control" required>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already a user? Login here</Link>
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
