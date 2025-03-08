// Login.js
import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onFinishHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", { email, password });
      dispatch(hideLoading());
      if (res.data.success) {
        const rememberMe = document.getElementById("remember").checked;
        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userType", res.data.userType);
        } else {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userType", res.data.userType);
        }
        alert("Login Successfully");
        navigate("/profile");  // Redirect all users to /profile

      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ASAP Health Care Service
          </Link>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-form">
          <h3 className="login-heading">Login Form</h3>
          <form onSubmit={onFinishHandler}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ms-2">Remember me</label>
            </div>
            <div className="login-submit">
              <button type="submit" className="btn">Login</button>
            </div>
            <div className="register-link">
              <Link to="/register" className="register-link-text">Not a user? Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;