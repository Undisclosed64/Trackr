const Project = require("../models/project");
const { validationResult, check } = require("express-validator");

exports.createProject = (req, res) => {
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  //validate date fields
  check(startDate)
    .isISO8601()
    .toDate()
    .withMessage("Start date does not have a valid format!");
  check(endDate)
    .isISO8601()
    .toDate()
    .withMessage("End date does not have a valid format!");

  //check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    //create project
    const project = new Project({
      title: req.body.title,
      startDate: startDate,
      endDate: endDate,
      description: req.body.description,
    });
    project.save((err, createdProject) => {
      if (err) res.status(500).json(err);
      res.json(createdProject);
    });
  }
};

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

exports.updateProject = (req, res) => {
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  const projectToUpdate = new Project({
    title: req.body.title,
    startDate: startDate,
    endDate: endDate,
    description: req.body.description,
    status: req.body.status,
    _id: req.params.id,
  });
  try {
    Project.findByIdAndUpdate(req.params.id, projectToUpdate, {
      new: true,
    }).exec((err, updatedProject) => {
      if (err) res.json(err);
      res.json(updatedProject);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteProject = (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err) => {
    if (err) res.json(err);
    res.json({ message: "Project deleted!" });
  });
};
