import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (!minLength) return "Password must be at least 8 characters long.";
    if (!hasUpperCase) return "Password must include at least one uppercase letter.";
    if (!hasLowerCase) return "Password must include at least one lowercase letter.";
    if (!hasNumber) return "Password must include at least one number.";
    if (!hasSpecialChar) return "Password must include at least one special character (!@#$%^&*).";

    return null;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    values.name = values.name.trim();
    values.email = values.email.trim();
    values.password = values.password.trim();
    values.confirmPassword = values.confirmPassword.trim();

    const passwordError = validatePassword(values.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      setLoading(false);
      alert(res.data.message);
      if (res.data.success) navigate("/login");
    } catch (error) {
      dispatch(hideLoading());
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handlePasswordChange = (event) => {
    // Hide the password automatically after typing for 2 seconds
    setTimeout(() => {
      setShowPassword(false);
      setShowConfirmPassword(false);
    }, 2000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Register Form</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmitHandler}>
          <input type="text" name="name" className="form-control mb-3" placeholder="Name" required aria-label="Name" disabled={loading} />
          <input type="email" name="email" className="form-control mb-3" placeholder="Email" required aria-label="Email" disabled={loading} />
          
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              required
              aria-label="Password"
              disabled={loading}
              onChange={handlePasswordChange}  // Handle password change
            />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          
          <div className="input-group mb-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              required
              aria-label="Confirm Password"
              disabled={loading}
              onChange={handlePasswordChange}  // Handle confirm password change
            />
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          
          <button type="button" className="btn btn-link p-0" onClick={() => setShowCriteria(!showCriteria)}>
            Password Criteria {showCriteria ? "▲" : "▼"}
          </button>
          {showCriteria && (
            <div className="alert alert-info mt-2">
              <ul className="mb-0">
                <li>At least 8 characters long</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character (!@#$%^&*)</li>
              </ul>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
