import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Style/dashboard.css";

export default function DashBoardCom() {
  const [trains, setTrains] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data using axios
    setLoading(true);
    axios.get("http://localhost:5000/frontend/dashboard-info")
      .then((response) => {
        console.log("Fetched train data:", response.data);
        if (response.data.Items && response.data.Items.length > 0) {
          setTrains(response.data.Items);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching train info:", err);
        setError("Failed to load train data");
        setLoading(false);
      });
  }, []);

  // Handle search input change
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Process trains data to create row entries
  const processTrainData = (trainsData) => {
    const rowData = [];

    trainsData.forEach(train => {
      if (train.name && (!searchTerm || train.name.toLowerCase() === searchTerm.toLowerCase())) {
        if (train.components && typeof train.components === 'object') {
          Object.entries(train.components).forEach(([comp, value]) => {
            rowData.push({
              id: `${train.id || train.name}-${comp}`,
              name: train.name,
              model: train.model,
              component: comp,
              value: value
            });
          });
        } else {
          rowData.push({
            id: train.id || train.name,
            name: train.name,
            model: train.model,
            component: "N/A",
            value: "N/A"
          });
        }
      }
    });

    return rowData;
  };

  // Get processed data that's already filtered
  const processedData = processTrainData(trains);

  if (loading) return <div className="loading">Loading train data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Train Data</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search train name..."
          value={searchTerm}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="main-content">
        <div className="train-table-wrapper">
          <table className="component-table">
            <thead>
              <tr>
                <th>Train Name</th>
                <th>Model</th>
                <th>Component</th>
                <th>Component ID</th>
              </tr>
            </thead>
            <tbody>
              {processedData.length > 0 ? (
                processedData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.model}</td>
                    <td>{row.component}</td>
                    <td>{row.value}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No trains found matching "{searchTerm}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
