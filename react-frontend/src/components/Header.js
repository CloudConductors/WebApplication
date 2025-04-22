import '../assets/Style/index.css';
import logo from '../assets/images/cloud-conductors-logo.svg';
import search from '../assets/images/magnify.svg';
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";


export default function Header() {

  return (
    <div>
        <header>
            <div className="top-bar">
                <div className="logo-container">
                    <Link to="/"><img className="logo-image" src={logo} alt="logo" /></Link>
                    <div className="logo-text">
                        <p className="team-name">Cloud Conductors</p>
                    </div>
                </div>
                <div className="search-container">
                    <div className="search-box">
                        <input
                            id="search-box"
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            //value={query}
                            //onChange={handleChange}
                        />
                        <button type="submit" className="search-btn">
                                <img src={search} alt="search-icon" className="search-icon" />
                        </button>
                    </div>
                </div>
                <div className="access-account-buttons">
                        <Link to="/login" className="Link login-button">Login</Link>
                        <Link to="/signUp" className="Link sign-up-button">Sign Up</Link>
                </div>
            </div>
        </header>
    </div>
  );
}
