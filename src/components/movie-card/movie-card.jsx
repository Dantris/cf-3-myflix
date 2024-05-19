export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <div onClick={() => onMovieClick(movieData)} style={{ cursor: 'pointer' }}>
            {movieData.title}
        </div>
    );
}
