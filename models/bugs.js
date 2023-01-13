const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedDev: { type: String, default: "unassigned" },
  bugType: { type: String, default: "ui" },
  flag: { type: String, default: "external" },
  severity: { type: String, default: "minor" },
  status: { type: String, default: "open" },
  dueDate: {
    type: Date,
    default: new Date(+new Date() + 1 * 24 * 60 * 60 * 1000),
  },
  createdOn: { type: Date },
  createdBy: { type: Object, required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  trackActivities: [{ date: { type: Date }, updatedField: { type: String } }],
});

module.exports = mongoose.model("Bugs", bugSchema);
