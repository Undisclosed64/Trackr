const express = require("express");
const router = express.Router();
const bugController = require("../controllers/bugController");

router.post("/bugs", bugController.CreateBugs);

router.get("/bugs", bugController.findBugsByProjects);

router.get("/bugs/:id", bugController.getBug);

router.put("/bugs/:id", bugController.updateBug);

// router.delete("/bugs", bugController.deleteBugs);

module.exports = router;
