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
import Objective1 from '../assets/images/Objective-1.png';
import Objective2 from '../assets/images/Objective-2.png';
import Objective3 from '../assets/images/Objective-3.png';
import Methods from '../assets/images/methods-img.png';



export default function TeamCom() {
  return (
    <div className="team-page p-5">
      <div className="container">
        <h1 className="team-title-mb-4">Cloud Conductors</h1>

        <div className="mb-5">
          {/* Project Overview */}
          <p className="project-info">
          Cloud Conductors has developed an advanced predictive maintenance system using AI 
          and IoT technology to enhance reliability in critical transportation infrastructure. 
          Our solution addresses the national security importance of train systems within our 
          mainland logistics network.
          </p>
          <p className="project-info">
          Through machine learning algorithms and real-time data collection via embedded systems, 
          we prevent costly breakdowns before they occur. Our comprehensive web platform provides 
          users with essential tools including real-time analysis, smart schedule management, and 
          manual override capabilities.
          </p>
        </div>

        <div className="mb-5">
        {/* Project Objectives */}
        <div className="objectives-grid">
            <div className="objective-item" id="obj-1">
            <img className="objective-img" src={Objective1} alt="IoT implementation" />
            <p className="objectives-title">IoT Implementation</p>
            </div>
            <div className="objective-item" id="obj-2">
            <img className="objective-img" src={Objective2} alt="Anomaly Detection" />
            <p className="objectives-title"> Anomaly Detection</p>
            </div>
            <div className="objective-item" id="obj-3">
            <img className="objective-img" src={Objective3} alt="Schedule Generation" />
            <p className="objectives-title">Schedule Generation</p>
            </div>
        </div>
        </div>

        <div className="method-section">
        <h4 className="section-heading">Intelligent Scheduling & Monitoring System</h4>
        <div className="method-content">
            <p className="method-text">
            Our platform uses statistical methods to predict maintenance needs based on manufacturer 
            component data, optimizing schedules by batching similar maintenance dates. An Isolation 
            Forest algorithm detects unexpected anomalies when they occur. The system runs on an 
            IoT network of Arduino sensors transmitting real-time data through Raspberry Pi devices 
            to our AWS backend for immediate analysis and storage. We used a dataset that was provided 
            by UC Irvine. It gathered readings from an operational metro train compressor’s Air 
            Production Unit (APU). From the APU it took reading on pressure, temperature, motor 
            current, and air intake valves.
            </p>
            <img className="method-img" src={Methods} alt="Methods" />
        </div>
        </div>

        <div className="architecture-section">
        <h4>Architecture</h4>
        <ul>
            <li>Our architecture consists of using multiple cloud components such as AWS IoT Core, 
                AWS DynamoDB, Arduino(s), and a Raspberry Pi.</li>
            <li>Multiple Arduinos will scan a train that is going along a track and collect sensor 
                data on various components. It will send that information to a Raspberry Pi where 
                it will then be sent to AWS IoT Core.</li>
            <li>IoT core will then send the data to DynamoDB where it will then be sent to our ML 
                Model to run anomaly and failure detection.</li>
            <li>New data sent back from the ML Model will be updated accordingly in our database.</li>
            <li>New users to our website will be able to signup and their account information will 
                be stored in a DynamoDB table.</li>
            <li>If a user is an administrator on the website, then they will be able to edit a 
                specific schedule and that information will be updated accordingly within our database.</li>
        </ul>
        </div>

        <div>
          <h4 className="our-team-heading">Our Team</h4>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Nick} alt="Nick Petruccelli" />
                <h5 className="member-name">Nick Petruccelli</h5>
                <div className="link-container">
                <a className="exact-link" href="https://www.linkedin.com/in/nick-petruccelli-b8717625a/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a className="exact-link" href="https://github.com/Nick-Petruccelli"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Jakob} alt="Jakob Olsen" />
                <h5 className="member-name">Jakob Olsen</h5>
                <div className="link-container">
                <a className="exact-link" href="https://www.linkedin.com/in/jakob-c-olsen/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a className="exact-link" href="https://github.com/jakobcolsen"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Devin} alt="Devin Thompson" />
                <h5 className="member-name">Devin Thompson</h5>
                <div className="link-container">
                <a className="exact-link" href="https://www.linkedin.com/in/devin-thompson-1a098522b/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a className="exact-link" href="https://github.com/dthom118"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Troy} alt="Troy Brown" />
                <h5 className="member-name">Troy Brown</h5>
                <div className="link-container">
                <a className="exact-link" href="https://www.linkedin.com/in/troy-brown-836b5b289/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a className="exact-link" href="https://github.com/troyfbrown"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Chris} alt="Christopher Cuartas" />
                <h5 className="member-name">Christopher Cuartas</h5>
                <div className="link-container">
                <a className="exact-link" href="https://www.linkedin.com/in/cuartas-christopher/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a className="exact-link" href="https://github.com/Zzz4nder"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
                
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card card p-3">
                <img className="profile-img" src={Bryonna} alt="Bryonna Gray" />
                <h5 className="member-name">Bryonna Gray</h5>
                <div className="link-container">
                <a className="exact-link" href="https://www.linkedin.com/in/bryonna-gray-7ab960171/"><img className="profile-link" src={linkedin} alt="linkedin profile link" /></a>
                <a className="exact-link" href="https://github.com/GGray1919"><img className="profile-link" src={github} alt="github profile link" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
