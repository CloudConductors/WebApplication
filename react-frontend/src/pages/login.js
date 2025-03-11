import React from "react";
import '../assets/Style/user.css';
import '../assets/Style/styles.css';


export default function Login() {
    return (
        <body>
            <div class="user-page">
                <h1>Login</h1>
                <div class="container">
                    <form action = '/signup' method = 'POST' class="user-form">
                        <div class="input-container">
                            <label for="email" class="user-label">Email Address:</label>
                            <input type="email" id="email" name="email" placeholder="example@abc.com" required />
                        </div>
                        
                        <div class="input-container">
                            <label for="password" class="user-label">Password:</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        
                        <input type="submit" value="Login" />     
                    </form>
                    <p>New to Our Site?</p>
                    <button onClick="location.href='signup.html'">Create an Account!</button>
                </div> 
            </div>
        </body>
    )
}
