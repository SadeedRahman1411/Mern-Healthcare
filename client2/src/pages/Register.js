// Register.js (Frontend - Improved Error Handling)
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      alert(res.data.message);
      if (res.data.success) navigate("/login");
    } catch (error) {
      dispatch(hideLoading());
      alert(error.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center">Register Form</h3>
        <form onSubmit={onSubmitHandler}>
          <input type="text" name="name" className="form-control mb-3" placeholder="Name" required />
          <input type="email" name="email" className="form-control mb-3" placeholder="Email" required />
          <input type="password" name="password" className="form-control mb-3" placeholder="Password" required />
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};
export default Register;
