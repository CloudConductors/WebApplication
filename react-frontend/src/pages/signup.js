import React from "react";
import '../assets/Style/user.css';

export default function SignUp() {
    return (
        <body>
            <div class="user-page">
                <h1>Sign Up</h1>
                <div class="container">
                    <form action = '/login' method = 'POST' class="user-form">
                        <div class="input-container">
                            <label for="email" class="user-label">Email Address:</label>
                            <input type="email" id="email" name="email" placeholder="example@abc.com" required />
                        </div>
                        
                        <div class="input-container">
                            <label for="password" class="user-label">Password:</label>
                            <input type="password" id="password" name="password" minlength="8" required />
                        </div>
                        
                        <input type="submit" value="Sign Up" />      
                    </form>
                    <p>Already Have An Account?</p>
                    <button onClick="location.href='login.html'">Sign In Here!</button>
                </div>
            </div>
        </body>
    )
}