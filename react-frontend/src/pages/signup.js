import React, { useState } from "react";
import axios from "axios";
// import '../assets/Style/user.css';
import {Link, useNavigate} from 'react-router-dom';
import AuthForm from "../components/authForm";
import { validateForm } from "../components/authForm";

export default function SignUp() {
    const [signupForm, setSignupForm] = useState({
        name: "",
        email: "",
        password: ""
      });

    const [Message, setMessage] = useState("");
    const [Variant, setVariant] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

      function SignMeUp(event) {
        event.preventDefault();

        //Input Validation
        const validationErrors = validateForm(signupForm, true);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
          return;
        }
        
        axios.post("http://127.0.0.1:5000/signup",{
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password
           })
        .then((response) => {
          navigate("/login", { state: { message: "Signup successful!", variant: "success"} })
        }).catch((error) => {
            if (error.response) {
              console.error(error);
              setMessage(error.response.data.error);
              setVariant("danger");
            }
          });
  
        //reset the form after it's sumbitted
        setSignupForm(({
          name: "",
          email: "",
          password: ""}))  
      }

      const handleChange = (event) => {
        const { value, name } = event.target;
        setSignupForm((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

    return (
      <div id="test">
        <AuthForm
              title="Sign Up"
              action="/signup"
              footer="Already have an account?"
              footer2={<Link to="/login" className="custom-Link">Login here!</Link>}
              onSubmit={SignMeUp}
              email={signupForm.email}
              password={signupForm.password}
              name={signupForm.name}
              useName={true}
              onChange={handleChange}
              message={Message}
              variant={Variant}
              errors={errors}
          />
        </div>
    )
}