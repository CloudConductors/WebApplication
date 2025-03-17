import React from "react";
// import '../assets/Style/user.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/Style/styles.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export default function Login() {
    return (
        <body>
            <Container className="custom-authentication vh-100">
                <h1 className="custom-h1">Login</h1>
                    <Form action = '/signup' method = 'POST' className="w-75 h-50 p-5 custom-form">
                        <Form.Group className="mb-3 align-items-left">
                            <Form.Label for="email" className="mx-auto">Email Address:</Form.Label>
                            <Form.Control  type="email" id="email" name="email" placeholder="example@abc.com" className="w-75" required />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label for="password">Password:</Form.Label>
                            <Form.Control  type="password" id="password" name="password" required className="w-75" />
                        </Form.Group>
                        
                        <Button type="submit" className="w-25 mt-3 custom-submit">Login</Button>     
                    </Form>
                    <p className="custom-p">New to Our Site?</p>
                    <Button onClick="location.href='signup.html'" className="btn-lg custom-button">Create an Account!</Button>
            </Container>
        </body>
    )
}
