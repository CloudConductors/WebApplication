import React, { useState } from "react";
import axios from "axios";
import '../assets/Style/user.css';
// import '../assets/Style/styles.css';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import AuthForm from "../components/authForm";
import { validateForm } from "../components/authForm";

export default function Login() {
  const location = useLocation();
    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
      });
  
      const [Message, setMessage] = useState("");
      const [Variant, setVariant] = useState("success");
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();

      
    // Once the user submits this function is called
      function logMeIn(event) {
        event.preventDefault()

        const validationErrors = validateForm(loginForm); // get errors
        setErrors(validationErrors);

        // if (Object.keys(validationErrors).length > 0) {
        //   return;
        // }
        // const errors = validateForm(loginForm);

        axios.post("http://127.0.0.1:5000/login",{
            email: loginForm.email,
            password: loginForm.password
           })
        .then((response) => {
          console.log("Flask Said: ", response.data);
          navigate("/");
        }).catch((error) => {
          if (error.response) {
            console.error(error);
            setMessage(error.response.data.error);
            setVariant("danger");          
          }
        })
  
        //reset the form after it's sumbitted
        setloginForm(({
          email: "",
          password: ""}))
        }
  
      function handleChange(event) { 
        const {value, name} = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value})
        )}


    return (
      <div id="test">
        <AuthForm
          title="Login"
          action="/login"
          footer="New to Our Site?"
          footer2={<Link to="/signUp" className="custom-Link">Create an Account!</Link>}
          onSubmit={logMeIn}
          email={loginForm.email}
          password={loginForm.password}
          onChange={handleChange}
          message={Message || location?.state?.message}
          variant={Variant || location?.state?.variant}
          errors={errors}         
        />
      </div>
    )
}