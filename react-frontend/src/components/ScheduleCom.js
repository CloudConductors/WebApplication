import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Style/schedule.css";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ScheduleCom() {
  const { isAuthenticated } = useAuth();
  const [trains, setTrains] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const parseBool = (val) => {
    if (typeof val === "boolean") return val;
    if (typeof val === "string") return val.toLowerCase() === "true";
    return false;
  };

  const normalizeComponent = (component) => {
    return {
      component_id: component.component_id,
      train_id: component.train_id,
      expected_repair_duf: component.expected_repair_duf || component.Expected_Repair_DUF,
      last_repair_date: component.last_repair_date || component.Last_Repair_Date,
      maintenance_scheduled: parseBool(component.maintenance_scheduled || component.Maintenance_Scheduled),
      component_failure: parseBool(component.component_failure),
      manually_overriden: parseBool(component.manually_overriden || component.Manually_Overriden),
      mean_duf: component.mean_duf || component.Mean_DUF,
      standard_deviation_duf: component.standard_deviation_duf || component.Standard_Deviation_DUF
    };
  };

  useEffect(() => {
    fetch("http://localhost:5000/frontend/schedule")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched train data:", data);
        //setTrains(data.Items || []);

        const normalized = (data.Items || []).map(normalizeComponent);

/*
        const normalized = data.Items.map((item) => ({
          ...item,
          component_failure: String(item.component_failure).toLowerCase() === "true",
          maintenance_scheduled: String(item.maintenance_scheduled).toLowerCase() === "true",
          manually_overriden: String(item.manually_overriden).toLowerCase() === "true",
          expected_repair_duf: item.expected_repair_duf || item.Expected_Repair_DUF || "",
          last_repair_date: item.last_repair_date || item.Last_Repair_Date || "",
          mean_duf: item.mean_duf || item.Mean_DUF || "",
          standard_deviation_duf: item.standard_deviation_duf || item.Standard_Deviation_DUF || "",
        }));
*/

        setTrains(normalized);
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
  {/*
        <div className="edit-schedule-btn">
          <button className="btn-btn-primary">Edit Schedule</button>
        </div>
        */}

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
                  <td>{component.maintenance_scheduled ? "true" : "false"}</td>
                  <td>{component.component_failure ? "true" : "false"}</td>
                  <td>{component.manually_overriden ? "true" : "false"}</td>
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
