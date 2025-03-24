import React from "react";
import { Link } from "react-router-dom";

// Assets
import '../../assets/Style/nav-bar-style.css';
import alert from '../../assets/images/alert.webp';
import logo from '../../assets/images/cloud-conductors-logo.svg';
import hamburger from '../../assets/images/hamburger_icon.png';
import pie from '../../assets/images/pie-chart.webp';
import schedule from '../../assets/images/schedule.png';
import team from '../../assets/images/team.png';


export default function Navbar() {
  return (
      <div id="navBar" className="main">
        <nav>
          {/* all images from https://www.iconfinder.com/search?price=free */}
          <Link to="/"><img id="logo" src={logo} alt="logo" /></Link>
          <Link to="/Dashboard"><img src={hamburger} alt="dashboard" /></Link>
          <Link to="inProgess"><img src={pie} alt="analytics" /></Link>
          <Link to="/Schedule"><img src={schedule} alt="schedule" /></Link>
          <Link to="inProgess"><img src={alert} alt="alert" /></Link>
          <Link to="inProgess."><img src={team} alt="team" /></Link>
        </nav>
      </div>
  )
}