const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../verifyToken");

router.post("/users", userController.createUser);

router.post("/log-in", userController.logUser);

router.get("/random", verifyToken, userController.secretRoute);

// router.delete("/delete", userController.deleteAll);

module.exports = router;
