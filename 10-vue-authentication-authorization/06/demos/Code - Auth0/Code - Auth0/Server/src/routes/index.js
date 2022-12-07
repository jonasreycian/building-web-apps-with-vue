const express = require("express");
const router = express.Router();
const movies = require("../controllers/movies");
const userRouter = require("./userRoutes");


// Articles collection routes
router
  .route("/api/movies")
  .get(movies.getMovies)
  .post(movies.create);

// Single article routes
router.get("/api/movies/:id", movies.getMovie);

router.get("/api/cinemas", movies.getCinemas);

router.use("/api/users", userRouter);

module.exports = router;
