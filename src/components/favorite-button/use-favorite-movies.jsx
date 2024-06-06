import axios from 'axios';

const API_URL = 'https://myflixv1-deebdbd0b5ba.herokuapp.com';

export const useFavoriteMovies = (token) => {
  const addFavoriteMovie = async (username, movieId) => {
    try {
      console.log(`Adding movie: ${movieId} for user: ${username} with token: ${token}`);
      const response = await axios.post(`${API_URL}/users/${username}/movies/${movieId}`, {}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      console.log('Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error adding to favorites:', error.response || error);
      throw error; // Rethrow to handle in component if needed
    }
  };

  const deleteFavoriteMovie = async (username, movieId) => {
    try {
      console.log(`Deleting movie: ${movieId} for user: ${username} with token: ${token}`);
      const response = await axios.delete(`${API_URL}/users/${username}/movies/${movieId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      console.log('Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error; // Rethrow to handle in component if needed
    }
  };

  return { addFavoriteMovie, deleteFavoriteMovie };
};
