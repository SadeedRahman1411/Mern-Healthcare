import React from "react";
import "./bloodRequest.css";

const RequestList = ({ requests }) => {
  return (
    <div className="request-list p-3 shadow bg-white rounded">
      <h5 className="mb-3 text-danger fw-bold">Active Blood Requests</h5>
      {requests.length === 0 ? (
        <p className="text-muted">No requests found.</p>
      ) : (
        <ul className="list-group">
          {requests.map((req) => (
            <li key={req._id} className="list-group-item">
              <strong>{req.name}</strong> needs{" "}
              <span className="text-danger">{req.bloodType}</span> blood at{" "}
              {req.location}.
              <br />
              <small>Contact: {req.contact}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestList;
