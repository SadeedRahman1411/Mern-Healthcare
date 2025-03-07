import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AmbulanceList.css"; // Keep existing CSS
import AmbulanceProfile from "./ambulances/AmbulanceProfile";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AmbulanceList = () => {
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [ambulanceType, setAmbulanceType] = useState("");
  const [ambulances, setAmbulances] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        const params = new URLSearchParams();
        if (city) {
          params.append("city", city);
        }
        if (area) {
          params.append("area", area);
        }
        if (ambulanceType) {
          params.append("type", ambulanceType);
        }

        const apiUrl = `/api/v1/user/ambulance/all?${params.toString()}`;

        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API Response:", response.data.ambulances);
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
    if (city) {
      setAvailableAreas(citiesAndAreas[city] || []);
    } else {
      setAvailableAreas([]);
    }

    setArea("");
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


  const getAmbulanceTypeName = (type) => {
    switch (type) {
      case "acAmbulance":
        return "AC Ambulance";
      case "icuAmbulance":
        return "ICU Ambulance";
      case "emergencyAmbulance":
        return "Emergency Ambulance";
      default:
        return "Ambulance";
    }
  };


  return (
    <div className="ambulance-list-container">
      {/* Navigation Bar (Copy from Login.js) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ASAP Health Care Service
          </Link>
        </div>
      </nav>

      {/* Hero Section - Similar to AmbulanceService.js header */}
      <header className="container text-center py-5">
        <h1 className="display-5 fw-bold">Find Your Ambulance</h1>
        <p className="lead">Search for available ambulances based on your needs.</p>
      </header>


      {/* Filter Section - Adjusted for better appearance */}
      <section className="form-section container py-3">  {/* Using form-section class */}
        <h2 className="text-center text-primary mb-4">Search Ambulances</h2> {/*Moved Header Here*/}
        <div className="filter-section">
          <select className="form-select" value={city} onChange={handleCityChange}>
            <option value="">Select City</option>
            {Object.keys(citiesAndAreas).map(cityOption => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>

          <select className="form-select" value={area} onChange={handleAreaChange} disabled={!city}>
            <option value="">Select Area</option>
            {availableAreas.map(areaOption => (
              <option key={areaOption} value={areaOption}>
                {areaOption}
              </option>
            ))}
          </select>

          <select className="form-select" value={ambulanceType} onChange={handleAmbulanceTypeChange}>
            <option value="">Select Type</option>
            <option value="acAmbulance">AC Ambulance</option>
            <option value="icuAmbulance">ICU Ambulance</option>
            <option value="emergencyAmbulance">Emergency Ambulance</option>
          </select>
        </div>
      </section>


      {isLoading && <p className="text-center">Loading ambulances...</p>}
      {error && <p className="error-message text-center">Error: {error}</p>}

         {/* Ambulance Profile Container */}
      <div className="ambulance-profile-container">
        {ambulances.length > 0 ? (
          ambulances.map(ambulance => {
            return (
            <div className="ambulance-profile-box">
              <p><span className="ambulance-label">Ambulance Type:</span> {getAmbulanceTypeName(ambulance.ambulanceType)}</p>
              <p><span className="ambulance-label">City:</span> {ambulance.city}</p>
              <p><span className="ambulance-label">Area:</span> {ambulance.area}</p>
              <p><span className="ambulance-label">Contact:</span> {ambulance.contactNumber}</p>
            </div>
            );
          })
        ) : (
          !isLoading && !error && <p className="text-center">No ambulances found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AmbulanceList;