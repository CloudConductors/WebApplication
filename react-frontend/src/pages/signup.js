import React from "react";
// import '../assets/Style/user.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/Style/styles.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';


export default function SignUp() {
    return (
        <body>
            <Container className="custom-authentication vh-100">
                
                    <Form action = '/signup' method = 'POST' className="w-75 h-50 p-5 custom-form">
                    <h1 className="custom-h1 pb-5">Sign Up</h1>
                        <Form.Group className="mb-3 align-items-left">
                            <Form.Label for="email" className="mx-auto">Email Address:</Form.Label>
                            <Form.Control  type="email" id="email" name="email" placeholder="example@abc.com" className="custom-control" required />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label for="password">Password:</Form.Label>
                            <Form.Control  type="password" id="password" name="password" required className="custom-control" />
                        </Form.Group>
                        
                        <Button type="submit" className="w-25 mt-3 custom-submit">Sign Up</Button>     
                    </Form>
                    <p className="custom-p">Already Have An Account?</p>
                    <Link to="/login" className="custom-Link">Login Here!</Link>
            </Container>
            
        </body>
    )
}
    
    
    
    
    
    
    
    // return (
    //     <body>
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
    //     </body>
    // )
// }