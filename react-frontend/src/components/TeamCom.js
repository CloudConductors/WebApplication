import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Style/team.css";
import Bryonna from '../assets/images/Bryonna.jpg';
import Chris from '../assets/images/Chris.jpg';
import Devin from '../assets/images/Devin.jpg';
import Jakob from '../assets/images/Jakob.jpg';
import Nick from '../assets/images/Nick.jpg';
import Troy from '../assets/images/Troy.jpg';
import linkedin from '../assets/images/linkedin.png';
import github from '../assets/images/github.png';


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
                <img className="profile-img" src={Nick} alt="Nick Petruccelli" />
                <h5 className="team-name">Nick Petruccelli</h5>
                <div className="link-container">
                <a href="https://www.linkedin.com/in/nick-petruccelli-b8717625a/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a href="https://github.com/Nick-Petruccelli"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                <p>---</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Jakob} alt="Jakob Olsen" />
                <h5 className="team-name">Jakob Olsen</h5>
                <div className="link-container">
                <a href="https://www.linkedin.com/in/jakob-c-olsen/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a href="https://github.com/jakobcolsen"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                <p>---</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Devin} alt="Devin Thompson" />
                <h5 className="team-name">Devin Thompson</h5>
                <div className="link-container">
                <a href="https://www.linkedin.com/in/devin-thompson-1a098522b/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a href="https://github.com/dthom118"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                <p>----</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Troy} alt="Troy Brown" />
                <h5 className="team-name">Troy Brown</h5>
                <div className="link-container">
                <a href="https://www.linkedin.com/in/troy-brown-836b5b289/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a href="https://github.com/troyfbrown"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                <p>---</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Chris} alt="Christopher Cuartas" />
                <h5 className="team-name">Christopher Cuartas</h5>
                <div className="link-container">
                <a href="https://www.linkedin.com/in/cuartas-christopher/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a href="https://github.com/Zzz4nder"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                <p>---</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Bryonna} alt="Bryonna Gray" />
                <h5 className="team-name">Bryonna Gray</h5>
                <div className="link-container">
                <a href="https://www.linkedin.com/in/bryonna-gray-7ab960171/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a href="https://github.com/GGray1919"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                <p>---</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
