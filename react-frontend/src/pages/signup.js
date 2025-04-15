import React, { useState } from "react";
import axios from "axios";
// import '../assets/Style/user.css';
import {Link, useNavigate} from 'react-router-dom';
import AuthForm from "../components/authForm";
import { validateForm } from "../components/authForm";

export default function SignUp() {
    const [signupForm, setSignupForm] = useState({
        email: "",
        password: ""
      });

    const [Message, setMessage] = useState("");
    const [variant, setVariant] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

      function SignMeUp(event) {
        event.preventDefault();

        //Input Validation
        const validationErrors = validateForm(signupForm);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
          return;
        }

        axios.post("http://127.0.0.1:5000/signup",{
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
              onChange={handleChange}
              message={Message}
              variant={variant}
              errors={errors}
          />
        </div>
    )
}
    
    
    
    
    
    
    
    // return (
    //     <main>
    //         <div class="user-page">
    //             <h1>Sign Up</h1>
    //             <div class="container">
    //                 <form action = '/login' method = 'POST' class="user-form">
    //                     <div class="input-container">
    //                         <label for="email" class="user-label">Email Address:</label>
    //                         <input type="email" id="email" name="email" placeholder="example@abc.com" required />
    //                     </div>
                        
    //                     <div class="input-container">
    //                         <label for="password" class="user-label">Password:</label>
    //                         <input type="password" id="password" name="password" minlength="8" required />
    //                     </div>
                        
    //                     <input type="submit" value="Sign Up" />      
    //                 </form>
    //                 <p>Already Have An Account?</p>
    //                 <button onClick="location.href='login.html'">Sign In Here!</button>
    //             </div>
    //         </div>
    //     </main>
    // )
// }
