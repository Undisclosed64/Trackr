const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.createUser);

router.post("/log-in", userController.logUser);

// router.delete("/delete", userController.deleteAll);

module.exports = router;
