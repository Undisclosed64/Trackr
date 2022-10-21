const Bug = require("../models/bugs");
const { validationResult, check } = require("express-validator");
const { ObjectId } = require("mongodb"); // or ObjectID
const bugs = require("../models/bugs");
const mongoose = require("mongoose");

//bug create handler
exports.CreateBugs = [
  check("title").notEmpty().withMessage("Title can not be empty!"),
  check("dueDate")
    .isISO8601()
    .toDate()
    .withMessage("Due date does not have a valid format!"),

  async (req, res) => {
    //look for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    //create bug and save
    else {
      const bug = new Bug({
        title: req.body.title,
        description: req.body.description,
        assignedDev: req.body.assignedDev,
        bugType: req.body.bugType,
        flag: req.body.flag,
        severity: req.body.severity,
        dueDate: req.body.dueDate,
        createdOn: Date.now(),
        project: req.body.project,
      });
      bug.save((err, createdBug) => {
        if (err) res.status(400).json(err);
        res.status(200).json(createdBug);
      });
    }
  },
];

//get a single bug info
exports.getBug = async (req, res) => {
  try {
    Bug.findById(req.params.id, (err, item) => {
      if (err) res.status(400).json(err);
      res.status(200).json(item);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//sort all bugs by projects
exports.findBugsByProjects = (req, res) => {
  //convert string ids to objectid(else aggregate can't find )
  const ids = req.query.ids;
  console.log(req.query);
  if (ids) {
    let objectIdArray = ids.map((id) => mongoose.Types.ObjectId(id));
    console.log(objectIdArray);

    Bug.aggregate([
      //get all bugs that match the project id present in array
      { $match: { project: { $in: objectIdArray } } },
      // //group all bugs by the same project id
      {
        $group: { _id: "$project", records: { $push: "$$ROOT" } },
      },

      {
        $lookup: {
          from: "projects",
          localField: "_id",
          foreignField: "_id",
          as: "project_info",
        },
      },
    ]).exec(function (err, bugs) {
      if (err) res.status(400).json(err);

      res.json(bugs);
    });
  }
};

// Bug.aggregate([
//   { $match: { project: { $in: req.body.ids } } },
//   function (err, result) {
//     if (err) res.status(400).json(err);
//     res.json(result);
//   },
// ]);

// try {
//   Bug.find({ project: { $in: req.body.ids } })
//     .populate("project")
//     .exec(function (err, bugs) {
//       if (err) res.status(400).json(err);
//       console.log(bugs.project);
//       res.json(bugs);
//     });
// } catch (err) {
//   res.status(500).json(err);
// }

// //get all bugs
// exports.getAllBugs = async (req, res) => {
//   try {
//     Bug.find((err, bugs) => {
//       if (err) res.status(400).json(err);
//       res.status(200).json(bugs);
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

//update a bug
exports.updateBug = [
  check("title").notEmpty().withMessage("Title can not be empty!"),
  check("dueDate")
    .isISO8601()
    .toDate()
    .withMessage("Due date does not have a valid format!"),

  async (req, res) => {
    //if errors return
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    else {
      //create bug object
      const bugToUpdate = new Bug({
        project: req.body.project,
        title: req.body.title,
        description: req.body.description,
        assignedDev: req.body.assignedDev,
        bugType: req.body.bugType,
        flag: req.body.flag,
        severity: req.body.severity,
        status: req.body.status,
        dueDate: req.body.dueDate,
        _id: req.params.id,
      });
      //find bug by id and update it
      try {
        Bug.findByIdAndUpdate(req.params.id, bugToUpdate, {
          new: true,
        }).exec((err, updatedBug) => {
          if (err) res.status(400).json(err);
          res.status(200).json(updatedBug);
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  },
];

// exports.deleteBugs = (req, res) => {
//   Bug.deleteMany({}, (err, succes) => {
//     if (err) res.json(err);
//     res.json("sucess");
//   });
// };
