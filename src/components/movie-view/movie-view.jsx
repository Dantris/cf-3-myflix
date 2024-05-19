export const MovieView = ({ movieData, onBackClick }) => {
    return (
        <div>
            <h1>{movieData.title}</h1>
            <img src={movieData.image} alt={movieData.title} />
            <p>{movieData.description}</p>
            <div>
                <strong>Genre:</strong> {movieData.genre}
                <strong>Director:</strong> {movieData.director}
            </div>
            <button onClick={onBackClick}>Back to list</button>
        </div>
    );
}
