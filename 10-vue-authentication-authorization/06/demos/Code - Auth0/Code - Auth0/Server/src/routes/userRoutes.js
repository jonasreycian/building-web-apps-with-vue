const router = require("express").Router();
const users = require("../controllers/users");
const checkJwt = require("./routeGaurd");
const jwtAuthz = require('express-jwt-authz');

const checkScopes = jwtAuthz([ 'crud:users' ]);

router.get("/", checkJwt, checkScopes, users.getAllUsers);

router.get("/:id", checkJwt, checkScopes, users.getUser);

router.get("/email/:email", checkJwt, checkScopes, users.getUserByEmail);

router.post("/", checkJwt, checkScopes, users.update);

router.put("/:email", checkJwt, checkScopes, users.updateUserRole);

module.exports = router;
