import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../movie-view/movie-view.scss';

export const MovieView = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(`Fetching movie with ID: ${movieId}`);
    fetch(`https://myflixv1-deebdbd0b5ba.herokuapp.com/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched movie data:", data);
        setMovie(data);
        setLoading(false);
    })
    .catch(error => {
        console.error("Error fetching movie:", error);
        setError(error.toString());
        setLoading(false);
    });
}, [movieId]);


    if (loading) return <div>Loading movie details...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="movie-view">
            <div className="movie-image">
                <img src={movie.image} alt={`Poster for ${movie.title}`} className="movie-poster" />
            </div>
            <div className="movie-details">
                <h1 className="movie-title">{movie.title}</h1>
                <p className="movie-metadata">{movie.year} • {movie.genre}</p>
                <p className="movie-director">Directed by {movie.director}</p>
                <p className="movie-description">{movie.description}</p>
                <Link to={`/`}><button className="back-button">Back</button></Link>
            </div>
        </div>
    );
};
