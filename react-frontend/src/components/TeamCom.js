import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Style/team.css";

export default function TeamCom() {
  return (
    <div className="team-page p-5">
      <div className="container">
        <h1 className="team-title mb-4">Cloud Conductors</h1>
        <h3 className="team-subtitle mb-3">
          Smart Maintenance: Predicting and Preventing Failures in Transportation Systems Using IoT and AI
        </h3>

        <div className="mb-5">
          <h4 className="section-heading">Project Overview</h4>
          <p>
            Cloud Conductors is developing a predictive maintenance system using AI and IoT
            to reduce breakdowns and ensure reliability in critical transportation systems. Sensors gather real-time data, and AI analyzes it to detect anomalies and suggest preventive actions before failure occurs.
          </p>
        </div>

        <div className="mb-5">
          <h4 className="section-heading">Project Objectives</h4>
          <ul>
            <li>Predict vehicle or equipment failures using machine learning.</li>
            <li>Integrate IoT sensors and cloud tech for real-time data processing.</li>
            <li>Optimize maintenance schedules to minimize downtime and cost.</li>
            <li>Deliver research findings, prototypes, and evaluation reports.</li>
          </ul>
        </div>

        <div>
          <h4 className="section-heading">Our Team</h4>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <h5 className="team-name">Nick Petruccelli</h5>
                <p>---</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <h5 className="team-name">Jakob Olsen</h5>
                <p>---</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <h5 className="team-name">Devin Thompson</h5>
                <p>----</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <h5 className="team-name">Troy Brown</h5>
                <p>---</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <h5 className="team-name">Christopher Cuartas</h5>
                <p>---</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <h5 className="team-name">Bryonna Gray</h5>
                <p>---</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
