const router = require("express").Router();
const users = require("../controllers/users");
const verifyToken = require("./routeGaurd");


router.get("/",verifyToken, users.getAllUsers);

router.get('/:id', verifyToken, users.getUser);

router.get("/email/:email", verifyToken, users.getUserByEmail);

router.post("/", verifyToken, users.update);

router.put("/:email", verifyToken, users.updateUserRole);

module.exports = router;