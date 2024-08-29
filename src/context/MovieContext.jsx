/**
 * Context API for managing movie data.
 *
 * @typedef {Object} MovieContextState
 * @property {array} movies - An array of movie objects.
 * @property {array} favoriteMovies - An array of movie IDs that are favorited.
 * @property {function} setMovies - Sets the movies state.
 * @property {function} setFavoriteMovies - Sets the favoriteMovies state.
 *
 * @constant
 * @type {React.Context<MovieContextState>}
 */
export const MovieContext = createContext({
  movies: [],
  favoriteMovies: [],
  setMovies: () => {},
  setFavoriteMovies: () => {},
});

/**
 * Hook for accessing the MovieContext state.
 *
 * @return {MovieContextState} The current state of the MovieContext.
 */
export const useMovieContext = () => useContext(MovieContext);

/**
 * Provider for the MovieContext.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {ReactElement} The rendered MovieContext.Provider component.
 */
export const MovieProvider = ({ children }) => {
  /**
   * Retrieves data from localStorage and attempts to parse it as JSON.
   * If unable to parse, logs an error and returns an empty array.
   *
   * @param {string} key The localStorage key to retrieve data from.
   * @return {array|object} The parsed data, or an empty array if unable to parse.
   */
  const getLocalStorageItem = (key) => {
    const storedData = localStorage.getItem(key);
    try {
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error(`Error parsing data from localStorage key: ${key}`, error);
      return [];  // Return an empty array as a fallback
    }
  };

  const [movies, setMovies] = useState(getLocalStorageItem("movies"));
  const [favoriteMovies, setFavoriteMovies] = useState(
    getLocalStorageItem("user")?.favoriteMovies || []
  );

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
    // Assume that favoriteMovies are part of a "user" object that needs to be reconstituted fully
    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.favoriteMovies = favoriteMovies;
    localStorage.setItem("user", JSON.stringify(user));
  }, [movies, favoriteMovies]);

  console.log("Favorite movies:", favoriteMovies);

  return (
    <MovieContext.Provider
      value={{ movies, favoriteMovies, setMovies, setFavoriteMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};

