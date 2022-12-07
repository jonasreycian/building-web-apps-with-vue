const axios = require("axios");

const httpClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  fetchMovies() {
    return httpClient.get("movies");    
  },

  fetchMovieDetails(id) {
    return httpClient.get(`movies/${id}`);
  },

  fetchCinemas() {
    return httpClient.get("cinemas");    
  },

  getUserByEmail(email, access_token) {
    return httpClient.get(`users/email/${email}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  },

  updateUser(user, access_token) {
    return httpClient.post('users', user, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  },

  getAllUsers(access_token) {
    return httpClient.get('users', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  },

  updateUserRoles(email, roles, access_token) {
    return httpClient.put(`users/${email}`, roles, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  },
};
