import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  // Sample data for dropdowns
  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const diseases = ["Diabetes", "Hypertension", "Asthma", "Cancer", "None"];
  const insuranceCompanies = ["Company A", "Company B", "Company C"];
  const specializations = ["Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "Surgeon"];
  const degrees = ["MBBS", "MD", "MCh", "DNB", "FRCS"];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
          // Navigate to login only if user type is not doctor.
          if (localStorage.getItem("userType") !== "doctor" && sessionStorage.getItem("userType") !== "doctor") {
            navigate("/login");
            return;
          }
        }

        const res = await axios.get("/api/v1/user/getUserInfo", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.user);
          setFormData(res.data.user);
        } else {
          alert("Failed to fetch user data");
          // Navigate to login only if user type is not doctor.
          if (localStorage.getItem("userType") !== "doctor" && sessionStorage.getItem("userType") !== "doctor") {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Navigate to login only if user type is not doctor.
        if (localStorage.getItem("userType") !== "doctor" && sessionStorage.getItem("userType") !== "doctor") {
          navigate("/login");
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.put(
        "/api/v1/user/updateUserInfo",
        {
          userId: user._id,
          userType: user.userType,
          bloodType: formData.bloodType,
          prevMedicalDiseases: formData.prevMedicalDiseases,
          insuranceCoverage: formData.insuranceCoverage,
          specialistIn: formData.specialistIn,
          degree: formData.degree,
          contactNumber: formData.contactNumber,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setUser(res.data.user);
        setIsEdit(false);
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e, field) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {user && user.userType === "doctor" ? (
            <span className="navbar-brand inactive-link">
              ASAP Health Care Service
            </span>
          ) : (
            <Link className="navbar-brand" to="/">
              ASAP Health Care Service
            </Link>
          )}
          <div className="ms-auto">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="container mt-5">
        <h3 className="text-center">User Profile</h3>
        <div className="card mx-auto mt-3 p-4" style={{ maxWidth: "400px" }}>
          {user ? (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Type:</strong> {user.userType === "doctor" ? "Doctor" : "Patient"}</p>

              {user.userType === "patient" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Blood Type</label>
                    {isEdit ? (
                      <select
                        name="bloodType"
                        className="form-select"
                        value={formData.bloodType}
                        onChange={handleChange}
                      >
                        {bloodTypes.map((bloodType) => (
                          <option key={bloodType} value={bloodType}>
                            {bloodType}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{user.bloodType}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Previous Medical Diseases</label>
                    {isEdit ? (
                      <select
                        name="prevMedicalDiseases"
                        multiple
                        className="form-select"
                        value={formData.prevMedicalDiseases}
                        onChange={(e) => handleSelectChange(e, "prevMedicalDiseases")}
                      >
                        {diseases.map((disease) => (
                          <option key={disease} value={disease}>
                            {disease}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{user.prevMedicalDiseases.join(", ")}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Insurance Coverage</label>
                    {isEdit ? (
                      <select
                        name="insuranceCoverage"
                        multiple
                        className="form-select"
                        value={formData.insuranceCoverage}
                        onChange={(e) => handleSelectChange(e, "insuranceCoverage")}
                      >
                        {insuranceCompanies.map((company) => (
                          <option key={company} value={company}>
                            {company}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{user.insuranceCoverage.join(", ")}</p>
                    )}
                  </div>
                </>
              )}

              {user.userType === "doctor" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Specialization</label>
                    {isEdit ? (
                      <select
                        name="specialistIn"
                        className="form-select"
                        value={formData.specialistIn}
                        onChange={handleChange}
                      >
                        {specializations.map((specialization) => (
                          <option key={specialization} value={specialization}>
                            {specialization}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{user.specialistIn}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Degree</label>
                    {isEdit ? (
                      <select
                        name="degree"
                        className="form-select"
                        value={formData.degree}
                        onChange={handleChange}
                      >
                        {degrees.map((degree) => (
                          <option key={degree} value={degree}>
                            {degree}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{user.degree}</p>
                    )}
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                {isEdit ? (
                  <input
                    type="text"
                    name="contactNumber"
                    className="form-control"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user.contactNumber}</p>
                )}
              </div>

              {!isEdit ? (
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
              ) : (
                <button className="btn btn-success" onClick={handleSave}>Save</button>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
         {/* Doctor Request List Button */}
         {user && user.userType === "doctor" && (
            <div className="text-center mt-2">
              <Link to="/doctorhome" className="btn btn-info">Request List</Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default Profile;