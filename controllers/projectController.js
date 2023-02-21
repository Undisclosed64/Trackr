const Project = require("../models/project");
const { validationResult, check } = require("express-validator");
const Bugs = require("../models/bugs");
const async = require("async");
const mongoose = require("mongoose");

//handler for project creation
exports.createProject = [
  //validate the input fields
  // check("title").not().isEmpty().withMessage("Project title can not be empty!"),
  // check("startDate")
  //   .isISO8601()
  //   .toDate()
  //   .withMessage("Start date does not have a valid format!"),
  // check("endDate")
  //   .isISO8601()
  //   .toDate()
  //   .withMessage("End date does not have a valid format!"),

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
        status: req.body.status,
      });
      if (req.user) {
        // console.log(req.user);
        const email = req.user.email;
        const username = email.substring(0, email.lastIndexOf("@"));
        project.createdBy = { username, email };
      }
      // if (req.body.status) {
      //   project.status = req.body.status;
      // }
      project.trackActivities.push({
        date: Date.now(),
        updatedField: `${req.user.email} has added project ${project.title}`,
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
      if (!project) return res.status(404).json("Project not found!");
      res.json(project);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all projects
exports.getAllProjects = (req, res) => {
  const filterActive = req.query.filterActive;
  const filterCompleted = req.query.filterCompleted;

  //query for filtering projects by active status
  if (filterActive) {
    try {
      Project.find(
        { "createdBy.email": req.query.email, status: "active" },
        (err, projects) => {
          if (err) res.status(404).json(err);
          res.json({ projects: projects });
        }
      );
    } catch (err) {
      res.status(400).json(err);
    }

    //else get all the projects
  } else if (filterCompleted) {
    try {
      Project.find(
        { "createdBy.email": req.query.email, status: "completed" },
        (err, projects) => {
          if (err) res.status(404).json(err);
          res.json({ projects: projects });
        }
      );
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    try {
      Project.find({ "createdBy.email": req.query.email }, (err, projects) => {
        if (err) res.status(404).json(err);
        res.json({ projects: projects });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

//get bugs of a single project
exports.getBugs = (req, res) => {
  console.log(req.params.id);
  try {
    Bugs.find(
      { project: mongoose.Types.ObjectId(req.params.id) },
      (err, tickets) => {
        if (err) {
          console.log(error);
          res.status(404).json(err);
        } else {
          // console.log(bugs);
          res.json(tickets);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
//update a project
exports.updateProject = async function (req, res, next) {
  // let oldVal = "";
  // function getPrevVal() {
  //   Project.findById(req.params.id).exec((err, project) => {
  //     if (err) console.log(err);
  //     console.log(req.body.fieldName);
  //     oldVal = project[`${req.body.fieldName}`];
  //   });
  // }
  // await getPrevVal();

  if (req.user.email !== req.body.createdBy.email) {
    res
      .status(400)
      .json({ message: "You are not allowed to update the project!" });
  }

  async.parallel(
    {
      project: function (callback) {
        Project.findById(req.params.id).exec(callback);
      },
      update: function (callback) {
        let updateField = {};
        updateField[req.body.fieldName] = req.body.value;
        console.log(updateField);

        //find the project and update
        Project.updateOne(
          { _id: req.params.id },
          {
            $set: updateField,
          },
          { new: true }
        ).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        res.json({ error: err });
      }
      results.project.trackActivities.push({
        date: Date.now(),
        updatedField: `${req.user.email} has updated the project ${req.body.fieldName} to ${req.body.value}`,
      });

      results.project.save();

      // Successful, so return.
      res.json({
        success: results.update,
        // project: results.project.trackActivities,
      });
    }
  );
};

//   if (req.user.email !== req.body.createdBy.email) {
//     res
//       .status(400)
//       .json({ message: "You are not allowed to update the project!" });
//   }

//   let updateField = {};
//   updateField[req.body.fieldName] = req.body.value;
//   console.log(updateField);

//   //find the project and update
//   Project.updateOne(
//     { _id: req.params.id },
//     {
//       $set: updateField,
//     },
//     { new: true },

//     // ).exec((err, updatedProject) => {
//     //   if (err) res.status(400).json(err);
//     //   res.status(200).json(updatedProject);
//     // });

//     function (err, count) {
//       if (err) res.json(err);
//       res.json(count);
//     }
//   );
// },

//delete project handler
exports.deleteProject = (req, res) => {
  console.log(req.user.email);
  // console.log(req.body);

  if (req.user.email !== req.body.projectOwnerEmail) {
    return res
      .status(400)
      .json({ message: "You are not allowed to delete the project!" });
  }
  Project.findByIdAndRemove(req.params.id, (err) => {
    if (err) res.status(500).json(err);
    res.status(200).json({ message: "Project has been deleted!" });
  });
};

// exports.deleteProjects = (req, res) => {
//   Project.deleteMany({}, (err, succes) => {
//     if (err) res.json(err);
//     res.json("sucess");
//   });
// };
