import React, { useState, useEffect } from "react";
// import '../assets/Style/user.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/Style/styles.css';
import '../assets/Style/user.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

        // form Validation
        export const validateForm = (data) => {
            const errors ={};

            if (!data.email.trim()) {
                errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(data.email)) {
                errors.email = 'Email is invalid';
            }
        
            if (!data.password.trim()) {
                errors.password = 'Password is required';
            } else if (data.password.length < 8) {
                errors.password = 'Password must be at least 8 characters long';
            }
        
            return errors;
        };

    export default function AuthForm({title, action, footer, footer2, onSubmit, onChange, email, password, message, variant, errors}) {
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
                                <div className="label-container">
                                    <Form.Label for="email" className="">Email Address: </Form.Label>
                                    {errors.email && <span>{errors.email}</span>}
                                </div>
                                <div className="input-container">
                                <Form.Control  type="email" id="email" name="email" placeholder="example@abc.com" className="custom-control" required value={email} onChange={onChange}/>
                                {errors.email && <span className="asterisk">*</span>}
                                </div>
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <div className="label-container">
                                    <Form.Label for="password">Password:</Form.Label>
                                    {errors.password && <span>{errors.password}</span>}
                                </div>
                                <div className="input-container">
                                <Form.Control  type="password" id="password" name="password" className="custom-control" required value={password} onChange={onChange}/>
                                {errors.password && <span className="asterisk">*</span>}
                                </div>
                            </Form.Group>
                            
                            <Button type="submit" className="w-25 mt-3 custom-submit" onClick={onSubmit}>{title}</Button>      
                        </Form>
                        <p className="custom-p">{footer}</p>
                        {footer2}
                </Container>
                
            </main>
        )
    }