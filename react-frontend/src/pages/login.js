import React from "react";
// import '../assets/Style/user.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/Style/styles.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';


export default function Login() {
    return (
        <body>
            <Container className="custom-authentication vh-100">
                
                    <Form action = '/signup' method = 'POST' className="w-75 h-50 p-5 custom-form">
                    <h1 className="custom-h1 pb-5">Login</h1>
                        <Form.Group className="mb-3 align-items-left">
                            <Form.Label for="email" className="mx-auto">Email Address:</Form.Label>
                            <Form.Control  type="email" id="email" name="email" placeholder="example@abc.com" className="custom-control" required />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label for="password">Password:</Form.Label>
                            <Form.Control  type="password" id="password" name="password" required className="custom-control" />
                        </Form.Group>
                        
                        <Button type="submit" className="w-25 mt-3 custom-submit">Login</Button>     
                    </Form>
                    <p className="custom-p">New to Our Site?</p>
                    <Link to="/signUp" className="custom-Link">Create an Account!</Link>
            </Container>
        </body>
    )
}
