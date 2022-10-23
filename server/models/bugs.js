const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedDev: { type: String, default: "Unassigned" },
  bugType: { type: String },
  flag: { type: String },
  severity: { type: String },
  status: { type: String, default: "Open" },
  dueDate: { type: Date },
  createdOn: { type: Date },
  createdBy: { type: Object, required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

module.exports = mongoose.model("Bugs", bugSchema);
