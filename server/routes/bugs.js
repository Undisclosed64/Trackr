const express = require("express");
const router = express.Router();
const bugController = require("../controllers/bugController");

router.post("/bugs", bugController.CreateBugs);

router.get("/bugs", bugController.getAllBugs);

router.get("/bugs/:id", bugController.getBug);

router.put("/bugs/:id", bugController.updateBug);

module.exports = router;
