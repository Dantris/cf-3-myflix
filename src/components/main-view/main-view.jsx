import React, { useState, useEffect } from 'react';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movie, setMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        console.log("User from localStorage:", user);  // Check what is retrieved from localStorage
        console.log("Token from localStorage:", token);
        if (!token) {
            return;
        }

        fetch("https://myflixv1-deebdbd0b5ba.herokuapp.com/movies", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    }, [token])

    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }} />
                {" or "}
                <SignupView />
            </>
        );
    }

    if (!movie) {
        return <div>Loading...</div>; // Handle loading state.
    }

    return (
        <div>
            <h1>Movie Details</h1>
            <div>
                <h3>{movie.title}</h3>
                <img src={movie.image} alt={movie.title} />
            </div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    );
}
