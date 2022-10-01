const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.post("/projects", projectController.createProject);

router.get("/projects", projectController.getAllProjects);

router.get("/projects/:id", projectController.getProject);

router.put("/projects/:id", projectController.updateProject);

router.delete("/projects/:id", projectController.deleteProject);

module.exports = router;
