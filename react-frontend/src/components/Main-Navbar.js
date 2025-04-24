import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Assets
import '../assets/Style/nav-bar-style.css';
import logo from '../assets/images/cloud-conductors-logo.svg';
import hamburger from '../assets/images/hamburger_icon.png';
import schedule from '../assets/images/schedule.png';
import team from '../assets/images/team.png';
import logout from '../assets/images/logout.webp';


export default function Navbar() {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName");
  
  function handleLogout(navigate) {
    // Clear sessionStorage
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
  
    // Optional: call backend to destroy Flask session
    axios.get("http://127.0.0.1:5000/frontend/logout")
      .then(() => {
        navigate("/login", { state: { justLoggedOut: true, message: "Logout successful!", variant: "success" } }); // Redirect to login page
      })
      .catch((error) => {
        console.error("Logout error:", error);
        navigate("/login"); // Still redirect even if Flask fails
      });
  }
  return (
      <div id="navBar" className="main">
        <nav>
          {/* all images from https://www.iconfinder.com/search?price=free */}
          <Link to="/" className='custom-link'><img id="logo" src={logo} alt="logo" /></Link>
          <Link to="/Dashboard"><img className='icon' src={hamburger} alt="dashboard" /></Link>
          <Link to="/Schedule"><img className='icon' src={schedule} alt="schedule" /></Link>
          { <Link to="/Team"><img className='icon' src={team} alt="team" /></Link> }
          { userName && (
            <button className="logout-button" onClick={() => handleLogout(navigate)} title="Logout"><img className='icon' src={logout} alt="logout" /> </button>
          )}
        </nav>
      </div>
  )
}
