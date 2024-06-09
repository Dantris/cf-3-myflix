import React, { useState, useEffect } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useFavoriteMovies } from "./use-favorite-movies";

const FavoriteButton = ({ user, movie, token, onFavoritesUpdate }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const { addFavoriteMovie, deleteFavoriteMovie } = useFavoriteMovies(token);

    useEffect(() => {
        const isFavorite = user.favoriteMovies.includes(movie._id);
        setIsFavorited(isFavorite);
    }, [user.favoriteMovies, movie._id]);

    const toggleFavorite = async () => {
        if (isFavorited) {
            await deleteFavoriteMovie(user.username, movie._id);
            user.favoriteMovies = user.favoriteMovies.filter(id => id !== movie._id);
        } else {
            await addFavoriteMovie(user.username, movie._id);
            user.favoriteMovies.push(movie._id);
        }
        setIsFavorited(!isFavorited);
        onFavoritesUpdate(user.favoriteMovies); // Call the callback to update favorites in parent component
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
