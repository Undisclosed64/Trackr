const Project = require("../models/project");
const { validationResult, check } = require("express-validator");

//handler for project creation
exports.createProject = [
  //validate the input fields
  check("title").not().isEmpty().withMessage("Project title can not be empty!"),
  check("startDate")
    .isISO8601()
    .toDate()
    .withMessage("Start date does not have a valid format!"),
  check("endDate")
    .isISO8601()
    .toDate()
    .withMessage("End date does not have a valid format!"),

  async (req, res) => {
    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      //create and save project
      const project = new Project({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
      });
      project.save((err, createdProject) => {
        if (err) res.status(500).json(err);
        res.json(createdProject);
      });
    }
  },
];

//get a single project
exports.getProject = (req, res) => {
  try {
    Project.findById(req.params.id, (err, project) => {
      if (err) res.status(404).json("Project not found!");
      res.json(project);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all projects
exports.getAllProjects = (req, res) => {
  try {
    Project.find((err, projects) => {
      if (err) res.json(err);
      res.json(projects);
    });
  } catch (err) {
    res.json(err);
  }
};

//update a project
exports.updateProject = [
  //validate the input fields
  check("title").not().isEmpty().withMessage("Project title can not be empty!"),
  check("startDate")
    .isISO8601()
    .toDate()
    .withMessage("Start date does not have a valid format!"),
  check("endDate")
    .isISO8601()
    .toDate()
    .withMessage("End date does not have a valid format!"),

  async (req, res) => {
    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      //define project object
      const projectToUpdate = new Project({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        status: req.body.status,
        _id: req.params.id,
      });
      //find the project and update
      Project.findByIdAndUpdate(req.params.id, projectToUpdate, {
        new: true,
      }).exec((err, updatedProject) => {
        if (err) res.status(400).json(err);
        res.status(200).json(updatedProject);
      });
    }
  },
];

//delete project handler
exports.deleteProject = (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err) => {
    if (err) resstatus(500).json(err);
    res.status(200).json({ message: "Project deleted!" });
  });
};
