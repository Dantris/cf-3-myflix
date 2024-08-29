// Path: components/NavigationBar.js

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../navigation-bar/navigation-bar.scss"; // Ensure this path is correct

export const NavigationBar = ({ user, onLoggedOut }) => {
    const handleLogout = () => {
        onLoggedOut(); // Function to clear the user session
        localStorage.clear(); // Clear all local storage items
    };

    return (
        <Navbar expand="lg" className="navbar-custom">
                <Navbar.Brand as={Link} to="/" className="logo">
                    MyFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link as="button" onClick={handleLogout} style={{ border: 'none', background: 'none' }}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
};
