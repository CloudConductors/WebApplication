import React from "react";
import '../assets/Style/index.css';
import logo from '../assets/images/cloud-conductors-logo.svg';
import search from '../assets/images/magnify.svg';


export default function Index() {
    return (
        <body>
            <header>
            <div class="top-bar">
                <div class="logo-container">
                    <a href=""><img class="logo-image" src={logo} alt="logo" /></a>
                    <div class="logo-text">
                        <p class="team-name">Cloud Conductors</p>
                    </div>
                </div>
                <div class="search-container">
                    <div class="search-box">
                        <input
                            id="search-box"
                            type="text"
                            class="form-control"
                            placeholder="Search anything"
                            />
                        <button class="search-btn" onclick="location.href='/search'">
                                <img src={search} alt="search-icon" class="search-icon" />
                        </button>
                    </div>
                </div>
                <div class="access-account-buttons">
                    <div class="button-1">
                        <button class="login-button" onclick="location.href='login.html'">Login</button>
                    </div>
                    <div class="button-2">
                        <button class="sign-up-button" onclick="location.href='signup.html'">Sign Up</button>
                    </div>
                </div>
            </div>
        </header>
        <div class="hero-banner">
            <div class="hero-container">
                <h1 id="title-1">Smart</h1>
                <h1 id="title-2">Maintenance</h1>
                <p id="paragraph-one">Predicting and Preventing Failures in Transportation Systems Using IoT and AI</p>
            </div>
            <div class="button-3">
                <button id="explore-button">Explore</button>
            </div>
        </div>
    </body> 
    )
}
