const Bug = require("../models/bugs");
const { validationResult, check } = require("express-validator");
const { ObjectId } = require("mongodb"); // or ObjectID
const bugs = require("../models/bugs");
const mongoose = require("mongoose");
const async = require("async");

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
        status: req.body.status,
        dueDate: req.body.dueDate,
        createdOn: Date.now(),
        project: req.body.project,
      });

      if (req.user) {
        // console.log(req.user);
        const email = req.user.email;
        const username = email.substring(0, email.lastIndexOf("@"));
        bug.createdBy = { username, email };
      }
      bug.trackActivities.push({
        date: Date.now(),
        updatedField: `${req.user.email} has added ticket ${bug.title}`,
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

    const isFilterByOpen = req.query.isFilterByOpenStatus;

    if (!isFilterByOpen) {
      console.log(isFilterByOpen);
      Bug.aggregate([
        //get all bugs that match the project id present in ids array
        { $match: { project: { $in: objectIdArray } } },

        //group all bugs by the same project id
        {
          $group: {
            _id: "$project",
            records: { $push: "$$ROOT" },
            count: { $sum: 1 },
          },
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
    } else {
      Bug.aggregate([
        //get all tickets that match the project id present in ids array and that has the open status
        {
          $match: {
            $and: [{ project: { $in: objectIdArray } }, { status: "Open" }],
          },
        },

        //group all bugs by the same project id
        {
          $group: {
            _id: "$project",
            records: { $push: "$$ROOT" },
            count: { $sum: 1 },
          },
        },
      ]).exec(function (err, bugs) {
        if (err) res.status(400).json(err);

        res.json(bugs);
      });
    }
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
exports.updateBug = async function (req, res, next) {
  async.parallel(
    {
      bug: function (callback) {
        Bug.findById(req.params.id).exec(callback);
      },
      update: function (callback) {
        let updateField = {};
        updateField[req.body.fieldName] = req.body.value;
        console.log(updateField);

        //find the bug and update
        Bug.updateOne(
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
      results.bug.trackActivities.push({
        date: Date.now(),
        updatedField: `${req.user.email} has updated the ${req.body.fieldName} to ${req.body.value}`,
      });

      results.bug.save();

      // Successful, so return.
      res.json({
        success: results.update,
        bug: results.bug.trackActivities,
      });
    }
  );
};

//delete ticket
exports.deleteTicket = (req, res) => {
  // console.log(req.user.email);
  // console.log(req.body);

  if (req.user.email !== req.body.tickeRaiser) {
    return res
      .status(400)
      .json({ message: "You are not allowed to delete this ticket!" });
  }
  Bug.findByIdAndRemove(req.params.id, (err) => {
    if (err) res.status(500).json(err);
    res.status(200).json({ message: "Ticket has been deleted!" });
  });
};
// exports.deleteBugs = (req, res) => {
//   Bug.deleteMany({}, (err, succes) => {
//     if (err) res.json(err);
//     res.json("sucess");
//   });
// };
