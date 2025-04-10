import React, { useState, useEffect } from "react";
// import '../assets/Style/user.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/Style/styles.css';
import '../assets/Style/user.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';




    export default function AuthForm({title, action, footer, footer2, onSubmit, onChange, email, password, message, variant}) {
        const [Message, setMessage] = useState(message);
        const [Variant, setVariant] = useState(variant);

        useEffect(() => {
            if (message) {
            setMessage(message);
            setVariant(variant);
        
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);
        
            return () => clearTimeout(timer);
            }
        }, [message, variant]);

    return (
            <main>
                {Message && <Alert variant={Variant} className="alert-test fade show">{Message}</Alert>}
                <Container className="custom-authentication vh-100">
                        <Form action = {action} method = 'POST' className="w-75 h-50 p-5 custom-form">
                        <h1 className="custom-h1 pb-5">{title}</h1>
                            <Form.Group className="mb-3 align-items-left">
                                <Form.Label for="email" className="mx-auto">Email Address:</Form.Label>
                                <Form.Control  type="email" id="email" name="email" placeholder="example@abc.com" className="custom-control" required value={email} onChange={onChange}/>
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label for="password">Password:</Form.Label>
                                <Form.Control  type="password" id="password" name="password" className="custom-control" required value={password} onChange={onChange}/>
                            </Form.Group>
                            
                            <Button type="submit" className="w-25 mt-3 custom-submit" onClick={onSubmit}>{title}</Button>      
                        </Form>
                        <p className="custom-p">{footer}</p>
                        {footer2}
                </Container>
                
            </main>
        )
    }