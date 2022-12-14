const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const verifyToken = require("../verifyToken");

router.post("/projects", verifyToken, projectController.createProject);

router.get("/projects", projectController.getAllProjects);

router.get("/projects/:id", projectController.getProject);

router.get("/projects/:id/bugs", projectController.getBugs);

router.put("/projects/:id", verifyToken, projectController.updateProject);

router.delete("/projects/:id", verifyToken, projectController.deleteProject);

// router.delete("/projects", projectController.deleteProjects);

module.exports = router;
