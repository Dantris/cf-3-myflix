import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';

import '../movie-card/movie-card.scss';

export const MovieCard = ({ movie, user, token }) => {
    console.log('User at MovieCard:', user);

    return (
        <Card className="movie-card h-100">
            <Card.Img variant="top" src={movie.image || 'default-image.jpg'} alt={movie.title} className="card-img-top" />
            <Card.Body className="card-body">
                <Card.Title className="card-title">{movie.title}</Card.Title>
                <Card.Text className="card-text">{`Directed by: ${movie.director}`}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className="back-button">See more</Button>
                </Link>
                <FavoriteButton user={user} movie={movie} token={token} onFavoritesUpdate={(favorites) => {
                    user.favoriteMovies = favorites;
                }} />
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
    }).isRequired,
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
};
