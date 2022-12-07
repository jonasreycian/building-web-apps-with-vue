const router = require("express").Router();
const users = require("../controllers/users");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  users.getAllUsers
);

router.get(
  "/:id",
  passport.authenticate("oauth-bearer", { session: false }),
  users.getUser
);

router.get(
  "/email/:email",
  passport.authenticate("oauth-bearer", { session: false }),
  users.getUserByEmail
);

router.post(
  "/",
  passport.authenticate("oauth-bearer", { session: false }),
  users.update
);

router.put(
  "/:email",
  passport.authenticate("oauth-bearer", { session: false }),
  users.updateUserRole
);

module.exports = router;
