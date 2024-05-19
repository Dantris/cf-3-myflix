import React, { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view'; // Make sure the path matches your folder structure

export const MainView = () => {
    const [movies, setMovies] = useState([
        { id: 1, title: "Bladerunner", director: "Ridley Scott", description: "Description here", image: "url_to_image", genre: "Sci-Fi" },
        { id: 2, title: "Jurassic Park", director: "Steven Spielberg", description: "Description here", image: "url_to_image", genre: "Adventure" },
        { id: 3, title: "Independence Day", director: "Roland Emmerich", description: "Description here", image: "url_to_image", genre: "Sci-Fi" },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    if (selectedMovie) return <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />

    return (
        <div>
            {movies.map(movie => (
                <MovieCard key={movie.id} movieData={movie} onMovieClick={handleMovieClick} />
            ))}
        </div>
    );
}
