import React, { useState, useEffect } from "react";

export default function TestComponent() {
  const [trains, setTrains] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/machine-learning/train-info") // fetch data from flask
      .then(response => response.json())
      .then(data => setTrains(data))
      .catch(error => console.error("Error fetching train info:", error));
  }, []);

  return (
    <div>
      <h2>Train Information</h2>
      {trains ? (
        <ul>
          {Object.keys(trains).map((trainId) => (
            <li key={trainId}>
              <h3>{trains[trainId].name}</h3>
              <ul>
                {Object.keys(trains[trainId].components).map((component) => (
                  <li key={component}>
                    <strong>{component}</strong>
                    <ul>
                      <li>Last Replaced: {trains[trainId].components[component]["last-replaced"]} days ago</li>
                      <li>Expected Failure: {trains[trainId].components[component]["expected-failure"]} days</li>
                      <li>Recommended Maintenance: {trains[trainId].components[component]["recomended-maintenance"]} days</li>
                      <li>Standard Deviation: {trains[trainId].components[component]["std-dev"]}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading train information...</p>
      )}
    </div>
  );
}
