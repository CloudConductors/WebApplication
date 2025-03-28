import React, { useState, useEffect } from "react";
import "../assets/Style/dashboard.css";

export default function DashBoardCom() {
  const [trains, setTrains] = useState({});
  const [selectedTrainId, setSelectedTrainId] = useState(null);

  // fetch train data
  useEffect(() => {
    fetch("http://localhost:5000/machine-learning/train-info")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched train data:", data);
        setTrains(data);

        const firstTrainId = Object.keys(data)[0];
        if (firstTrainId) {
          setSelectedTrainId(firstTrainId);
        }
      })
      .catch((error) => console.error("Error fetching train info:", error));
  }, []);

  const handleSelectTrain = (trainId) => {
    console.log("Selected Train ID:", trainId);
    setSelectedTrainId(trainId);
  };

  return (
    <main>
      <div className="dashboard">
        <h1 className="dashboard-title">DashBoard</h1>
        <div className="container">
          {/* Vehicle Select Section */}
          <div className="vehicle-select">
            <h2>Vehicles</h2>
            <ul className="vehicle-list">
              {Object.keys(trains).map((trainId) => (
                <li
                  key={trainId}
                  onClick={() => handleSelectTrain(trainId)}
                  className={trainId === selectedTrainId ? "active" : ""}
                >
                  {trains[trainId].name}
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Description Section */}
          <div className="vehicle-desc-cont">
            {selectedTrainId && trains[selectedTrainId] ? (
              <div className="vehicle-desc">
                <h2 className="vehicle-desc-name">
                  {trains[selectedTrainId].name}
                </h2>
                <div className="component-list">
                  {Object.entries(trains[selectedTrainId].components).map(
                    ([component, details]) => (
                      <div key={component} className="component_cont">
                        <strong className="component-name">{component}</strong>
                        <p>Last Replaced: {details["last-replaced"]} days ago</p>
                        <p>Expected Failure: {details["expected-failure"]} days</p>
                        <p>
                          Recommended Maintenance:{" "}
                          {details["recommended-maintenance"] || "N/A"} days
                        </p>
                        <p>Standard Deviation: {details["std-dev"]}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <p>No train selected</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}