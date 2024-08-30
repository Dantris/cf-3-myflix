import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from '../login-view/login-view';
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMovieContext } from "../../context/MovieContext";

export const MainView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || 'null'));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { movies, setMovies } = useMovieContext(); // Import the useMovieContext hook to track global movie state

  useEffect(() => {
    if (!token) return;
    fetch("https://myflixv1-deebdbd0b5ba.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.json())
    .then(data => {
      setMovies(data);
    })
    .catch(err => console.error("Error fetching movies:", err));
  }, [token]);

  const handleLoggedIn = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
    setToken(token);
  };

  const handleLoggedOut = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
      <Container fluid>
        <Routes>
          <Route path="/signup" element={<SignupView />} />
          <Route path="/login" element={<LoginView onLoggedIn={handleLoggedIn} />} />
          <Route path="/movies/:movieId" element={
            user ? <MovieView movies={movies} /> : <Navigate to="/login" replace />
          } />
          <Route path="/profile" element={
            user ? (
              <ProfileView 
                user={user} 
                token={token} 
                onUpdatedUser={setUser} 
                onLoggedOut={handleLoggedOut} 
              />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          } />
          <Route path="/" element={
            user ? (
              <Row>
                {movies.map((movie) => (
                  <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} user={user} token={token}/>
                  </Col>
                ))}
              </Row>
            ) : (
              <Navigate to="/login" replace={true} />
            )
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
