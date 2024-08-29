import React, { useState, useEffect } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useFavoriteMovies } from "./use-favorite-movies";
import { useMovieContext } from "../../context/MovieContext"; // Import the useMovieContext hook

const FavoriteButton = ({ user, movie, token }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const { addFavoriteMovie, deleteFavoriteMovie } = useFavoriteMovies(token);
    const { favoriteMovies, setFavoriteMovies, movies } = useMovieContext(); // Import the useMovieContext hook


    useEffect(() => {
        // Check if some element in the favoriteMovies array has an _id that matches the current movie's _id
        const isFavorite = favoriteMovies.some(favMovie => favMovie._id === movie._id);
        setIsFavorited(isFavorite);
    }, [favoriteMovies, movie._id]);

    /**
     * Toggles the favorite status of the current movie.
     *
     * If the movie is currently favorited, it will be unfavorited by calling
     * deleteFavoriteMovie and updating the favoriteMovies state with the
     * remaining movies. If the movie is not currently favorited, it will be
     * favorited by calling addFavoriteMovie and updating the favoriteMovies
     * state with the new list of favorited movies.
     *
     * Finally, it updates the isFavorited state to reflect the new favorite
     * status of the movie.
     */
    const toggleFavorite = async () => {
        if (isFavorited) {
            const favMovies = await deleteFavoriteMovie(user.username, movie._id);
            const favMovieIds = favMovies.favoriteMovies;
            setFavoriteMovies(movies.filter(movie => favMovieIds.includes(movie._id)));
        } else {
            const favMovies = await addFavoriteMovie(user.username, movie._id);
            const favMovieIds = favMovies.favoriteMovies;
            setFavoriteMovies(movies.filter(movie => favMovieIds.includes(movie._id)));
        }
        setIsFavorited(!isFavorited);
    };

    return (
        <div onClick={toggleFavorite}>
            {isFavorited ? (
                <BsHeartFill size={35} className="favorite-button" />
            ) : (
                <BsHeart size={35} className="favorite-button" />
            )}
        </div>
    );
};

export default FavoriteButton;
