import React, { useState } from "react";
import axios from "axios";
// import '../assets/Style/user.css';
import {Link, useNavigate} from 'react-router-dom';
import AuthForm from "../components/authForm";


export default function SignUp() {
    const [signupForm, setSignupForm] = useState({
        email: "",
        password: ""
      });

      const navigate = useNavigate();

      function SignMeUp(event) {
        axios.post("http://127.0.0.1:5000/signup",{
            email: signupForm.email,
        password: signupForm.password
           })
        .then((response) => {
          console.log("Flask Said: ", response.data)
          navigate("/login", { state: { message: "Signup successful!" } }); // Redirect to login page after successful sign up
        }).catch((error) => {
            if (error.response) {
              console.error(error);
              alert("Error signing up. Please try again.");
            }
          });
  
        //reset the form after it's sumbitted
        setSignupForm(({
          email: "",
          password: ""}))
  
        event.preventDefault()
      }

      const handleChange = (event) => {
        const { value, name } = event.target;
        setSignupForm((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };

    return (
      <AuthForm
            title="Sign Up"
            action="/signup"
            footer="Already have an account?"
            footer2={<Link to="/login" className="custom-Link">Login here!</Link>}
            onSubmit={SignMeUp}
            email={signupForm.email}
            password={signupForm.password}
            onChange={handleChange}
        />
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