const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  status: { type: String, default: "Active" },
  createdBy: { type: Object, required: true },
  lastModified: { type: Date },
  trackActivities: [{ date: { type: Date }, updatedField: { type: String } }],
});

module.exports = mongoose.model("Project", projectSchema);
