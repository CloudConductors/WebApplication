import React from "react";
import '../../assets/Style/nav-bar-style.css';
import alert from '../../assets/images/alert.webp';
import logo from '../../assets/images/cloud-conductors-logo.svg';
import hamburger from '../../assets/images/hamburger_icon.png';
import pie from '../../assets/images/pie-chart.webp';
import schedule from '../../assets/images/schedule.png';
import team from '../../assets/images/team.png';


export default function Navbar() {
  return (
    <body>
      <link rel="stylesheet" href="css/nav-bar-style.css" />
      <div id="navBar" class="main">
        <nav>
          {/* all images from https://www.iconfinder.com/search?price=free */}
          <a href="/"><img id="logo" src={logo} alt="logo" /></a>
          <a href="/Dashboard"><img src={hamburger} alt="dashboard" /></a>
          <a href="inProgess"><img src={pie} alt="analytics" /></a>
          <a href="/Schedule"><img src={schedule} alt="schedule" /></a>
          <a href="inProgess"><img src={alert} alt="alert" /></a>
          <a href="inProgess."><img src={team} alt="team" /></a>
        </nav>
      </div>
    </body>
  )
}