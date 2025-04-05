import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import '../assets/Style/user.css';
// import '../assets/Style/styles.css';
import {Link} from 'react-router-dom';
import AuthForm from "../components/authForm";
import Alert from 'react-bootstrap/Alert';





export default function Login() {
    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
      });
  
    // Once the user submits this function is called
      function logMeIn(event) {
        axios.post("http://127.0.0.1:5000/login",{
            email: loginForm.email,
            password: loginForm.password
           })
        .then((response) => {
          console.log("Flask Said: ", response.data)
        }).catch((error) => {
          if (error.response) {
            console.error(error);
            }
        })
  
        //reset the form after it's sumbitted
        setloginForm(({
          email: "",
          password: ""}))
  
        event.preventDefault()
      }
  
      function handleChange(event) { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}
  
        const location = useLocation();
        const [Message, setMessage] = useState("");

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
        }

        // Automatically hide the alert after 5 seconds
        const timer = setTimeout(() => {
            setMessage("");
        }, 50000000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [location.state]);




    return (
      <div id="test">
        {Message && <Alert variant="success " className="alert-test fade show">{Message}</Alert>}
        <AuthForm
          title="Login"
          action="/login"
          footer="New to Our Site?"
          footer2={<Link to="/signUp" className="custom-Link">Create an Account!</Link>}
          onSubmit={logMeIn}
          email={loginForm.email}
          password={loginForm.password}
          onChange={handleChange}
        />
      </div>
    )
}