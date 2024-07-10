import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import '../signup-view/signup-view.scss';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };
    
        fetch("https://myflixv1-deebdbd0b5ba.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
          .then(data => {
            alert("Signup successful. Welcome!");
            
            // Handle redirection or state updates here
          })
          .catch(error => {
            alert("Signup failed. Please try again.");
            console.error('Error:', error);
          });
    };
    

    return (
        <div className="signup-container">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        placeholder='Add Username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder='Add Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        placeholder='Add Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};
