import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import '../assets/Style/user.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/Style/styles.css';
import '../assets/Style/user.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
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
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [location.state]);




    return (
        <main>
          {Message && <Alert variant="success " className="alert-test fade show">{Message}</Alert>}
          <Container className="custom-authentication vh-100">
                    <Form action = '/signup' method = 'POST' className="w-75 h-50 p-5 custom-form">
                    <h1 className="custom-h1 pb-5">Login</h1>
                        <Form.Group className="mb-3 align-items-left">
                            <Form.Label for="email" className="mx-auto">Email Address:</Form.Label>
                            <Form.Control  type="email" id="email" name="email" placeholder="example@abc.com" className="custom-control" required  value={loginForm.email} onChange={handleChange}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label for="password">Password:</Form.Label>
                            <Form.Control  type="password" id="password" name="password" className="custom-control" required value={loginForm.password} onChange={handleChange}/>
                        </Form.Group>
                        
                        <Button type="submit" className="w-25 mt-3 custom-submit" onClick={logMeIn}>Login</Button>     
                    </Form>
                    <p className="custom-p">New to Our Site?</p>
                    <Link to="/signUp" className="custom-Link">Create an Account!</Link>
            </Container>
        </main>
    )
}
