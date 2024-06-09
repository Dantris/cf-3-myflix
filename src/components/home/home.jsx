import React from 'react';
import { Link } from "react-router-dom";
import '../home/home.scss';

export const Home = () => {
    return (
        <div className="home-container">
            <div className="navigation">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Register</Link>
            </div>
            <div className="footer">
                <p>Explore, Watch, Enjoy!</p>
                <p>© 2024 Your Movie Database. All rights reserved.</p>
            </div>
        </div>
    );
};
