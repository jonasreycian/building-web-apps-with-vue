const express = require("express");
const router = express.Router();
const movies = require("../controllers/movies");
const users = require("../controllers/users");

const verifyToken = require("./routeGaurd");

// Articles collection routes
router
  .route("/api/movies")
  .get(movies.getMovies)
  .post(movies.create);

// Single article routes
router.get("/api/movies/:id", movies.getMovie);

router.get("/api/cinemas", movies.getCinemas);

router.get("/api/users/:id", verifyToken, users.getUser);

router.get("/api/users/email/:email", verifyToken, users.getUserByEmail);

router.post("/api/users", verifyToken, users.update);

module.exports = router;
