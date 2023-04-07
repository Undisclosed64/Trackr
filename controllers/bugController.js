const Bug = require("../models/bugs");
const { validationResult, check } = require("express-validator");
const bugs = require("../models/bugs");
const mongoose = require("mongoose");
const async = require("async");

//bug create handler
exports.CreateBugs = [
  check("title").notEmpty().withMessage("Title can not be empty!"),
  // check("dueDate")
  //   .isISO8601()
  //   .toDate()
  //   .withMessage("Due date does not have a valid format!"),

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
  const ids = req.query.ids;

  if (ids) {
    //convert string ids to objectid(else aggregate can't find )
    let objectIdArray = ids.map((id) => mongoose.Types.ObjectId(id));
    // console.log(objectIdArray);

    const filterByOpen = () => {
      Bug.aggregate([
        //filter tickets by open status and project ids of the ids array
        {
          $match: {
            $and: [{ project: { $in: objectIdArray } }, { status: "open" }],
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
    };

    const getAllTickets = () => {
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
    };

    const filterByUnassigned = () => {
      Bug.aggregate([
        //filter tickets by unassigned status and project ids of the ids array
        {
          $match: {
            $and: [
              { project: { $in: objectIdArray } },
              { assignedDev: "unassigned" },
            ],
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
    };

    const filterByClosed = () => {
      Bug.aggregate([
        //filter tickets by closed status and project ids of the ids array
        {
          $match: {
            $and: [{ project: { $in: objectIdArray } }, { status: "closed" }],
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
    };

    //get tickets based on the query
    if (req.query.isFilterByOpenStatus) {
      filterByOpen();
    } else if (req.query.isFilterByUnassigned) {
      filterByUnassigned();
    } else if (req.query.isFilterByClosed) {
      filterByClosed();
    } else {
      getAllTickets();
    }
  }
};

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
