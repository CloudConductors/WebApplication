import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Style/schedule.css";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ScheduleCom() {
  const { isAuthenticated } = useAuth();
  const [trains, setTrains] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/frontend/schedule")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched train data:", data);
        setTrains(data.Items || []);
      })
      .catch((error) => console.error("Error fetching train info:", error));
  }, []);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    
    <div className="schedule">
      <h1>Scheduling Center</h1>

      {isAuthenticated && (
        <div className="edit-schedule-btn">
          <button className="btn-btn-primary">Edit Schedule</button>
        </div>
      )}

        <div className="edit-schedule-btn">
          <button className="btn-btn-primary">Edit Schedule</button>
        </div>

      {trains.length > 0 ? (
        <div className="table-container">
          <table className="component-table">
            <thead>
              <tr>
                <th>Component ID</th>
                <th>Train ID</th>
                <th>Expected Repair</th>
                <th>Last Repair</th>
                <th>Maintenance</th>
                <th>Failure</th>
                <th>Override</th>
                <th>Mean DUF</th>
                <th>Std Dev DUF</th>
              </tr>
            </thead>
            <tbody>
              {trains.map((component, index) => (
                <tr
                  key={component.component_id}
                  onClick={() => handleRowClick(index)}
                  className={selectedRow === index ? "clicked" : ""}
                >
                  <td>{component.component_id}</td>
                  <td>{component.train_id}</td>
                  <td>{component.expected_repair_duf}</td>
                  <td>{component.last_repair_date}</td>
                  <td>{component.maintenance_scheduled ? "Yes" : "No"}</td>
                  <td>{component.component_failure ? "Yes" : "No"}</td>
                  <td>{component.manually_overriden ? "Yes" : "No"}</td>
                  <td>{component.mean_duf}</td>
                  <td>{component.standard_deviation_duf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading train components...</p>
      )}
    </div>
  );
}
