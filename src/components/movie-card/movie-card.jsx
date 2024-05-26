export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <div onClick={() => onMovieClick(movieData)} style={{ cursor: 'pointer' }}>
            {movieData.title}
        </div>
    );
}

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};