import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AmbulanceList.css";
import AmbulanceProfile from "./ambulances/AmbulanceProfile";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AmbulanceList = () => {
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [ambulanceType, setAmbulanceType] = useState("");
  const [ambulances, setAmbulances] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]); // Changed state name for clarity
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Bangladesh cities and areas data (copied from AmbulanceService.js)
  const citiesAndAreas = {
    Dhaka: [
      "Mirpur", "Uttara", "Dhanmondi", "Gulshan", "Banani", "Mohammadpur", "Motijheel", "Badda"
    ],
    Chittagong: [
      "Agrabad", "Nasirabad", "Khulshi", "Halishahar", "Patenga", "GEC Circle", "Chawkbazar"
    ],
    Rajshahi: [
      "Boalia", "Motihar", "Rajpara", "Shaheb Bazar", "Upashahar", "Kazla"
    ],
    Khulna: [
      "Sonadanga", "Boyra", "Khalishpur", "Daulatpur", "Gollamari", "Khan Jahan Ali"
    ],
    Sylhet: [
      "Zindabazar", "Ambarkhana", "Upashahar", "Shibganj", "Subidbazar", "Tilagor"
    ],
    Barisal: [
      "Notullabad", "Rupatali", "Amanatganj", "Chor Kaua", "Sadar Road", "Kashipur"
    ],
    Rangpur: [
      "Modern More", "Dhap", "Shapla Chottor", "R.K. Road", "Jahaj Company More"
    ],
    Mymensingh: [
      "Ganginar Par", "Maskanda", "Chorpara", "Valuka", "Kalibari"
    ],
  };

  useEffect(() => {
    const fetchAmbulances = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await axios.get(
          `/api/v1/user/ambulance/all?city=${city}&area=${area}&type=${ambulanceType}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("API Response:", response.data.ambulances); // Add this line
        setAmbulances(response.data.ambulances);
      } catch (err) {
        console.error("Error fetching ambulances:", err);
        setError(err.message || "Failed to fetch ambulances.");
        setAmbulances([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmbulances();
  }, [city, area, ambulanceType]);

  useEffect(() => {
    // Update available areas based on the selected city
    if (city) {
      setAvailableAreas(citiesAndAreas[city] || []); //Use the loaded areas and default to empty to prevent crashes
    } else {
      setAvailableAreas([]);
    }

    setArea(""); // Reset area when city changes
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleAmbulanceTypeChange = (e) => {
    setAmbulanceType(e.target.value);
  };

  return (
    <div className="ambulance-list-container">
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
                <Link className="btn btn-outline-primary ms-2" to="/login">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h2>Find Available Ambulances</h2>

      <div className="filter-section">
        <select value={city} onChange={handleCityChange}>
          <option value="">Select City</option>
          {Object.keys(citiesAndAreas).map(cityOption => ( // Dynamic city options
            <option key={cityOption} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>

        <select value={area} onChange={handleAreaChange} disabled={!city}>
          <option value="">Select Area</option>
          {availableAreas.map(areaOption => ( // Dynamic area options
            <option key={areaOption} value={areaOption}>
              {areaOption}
            </option>
          ))}
        </select>

        <select value={ambulanceType} onChange={handleAmbulanceTypeChange}>
          <option value="">Select Type</option>
          <option value="acAmbulance">AC Ambulance</option>
          <option value="icuAmbulance">ICU Ambulance</option>
          <option value="emergencyAmbulance">Emergency Ambulance</option>
        </select>
      </div>

      {isLoading && <p>Loading ambulances...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <div className="ambulances-container">
        {ambulances.length > 0 ? (
          ambulances.map(ambulance => {
            console.log("Ambulance Profile Data:", ambulance); // Add this line
            return <AmbulanceProfile key={ambulance._id} ambulance={ambulance} />
          })
        ) : (
          !isLoading && !error && <p>No ambulances found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AmbulanceList;