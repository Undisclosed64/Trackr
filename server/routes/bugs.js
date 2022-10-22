const express = require("express");
const router = express.Router();
const bugController = require("../controllers/bugController");
const verifyToken = require("../verifyToken");

router.post("/bugs", bugController.CreateBugs);

router.get("/bugs", bugController.findBugsByProjects);

router.get("/bugs/:id", bugController.getBug);

router.put("/bugs/:id", verifyToken, bugController.updateBug);

router.delete("/bugs/:id", verifyToken, bugController.deleteTicket);

// router.delete("/bugs", bugController.deleteBugs);

module.exports = router;
