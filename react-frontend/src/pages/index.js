import React from "react";
import '../assets/Style/index.css';
import logo from '../assets/images/cloud-conductors-logo.svg';
import search from '../assets/images/magnify.svg';
import {Link} from 'react-router-dom';


export default function Index() {
    const userName = sessionStorage.getItem("userName");
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
                            className="form-control"
                            placeholder="Search anything"
                            />
                        <button className="search-btn" onClick="location.href='/search'">
                                <img src={search} alt="search-icon" className="search-icon" />
                        </button>
                    </div>
                </div>
                {userName ? (
                    <div className="access-account-buttons">
                        <p className="name" >Welcome, {userName}!</p>
                    </div>
                ) : (
                <div className="access-account-buttons">
                        <Link to="/login" className="Link login-button">Login</Link>
                        <Link to="/signUp" className="Link sign-up-button">Sign Up</Link>
                </div>
                )}
            </div>
        </header>
        <div className="hero-banner">
            <div className="hero-container">
                <h1 id="title-1">Smart</h1>
                <h1 id="title-2">Maintenance</h1>
                <p id="paragraph-one">Predicting and Preventing Failures in Transportation Systems Using IoT and AI</p>
            </div>
            <div className="button-3">
                <button id="explore-button">Explore</button>
            </div>
        </div>
    </div> 
    )
}
