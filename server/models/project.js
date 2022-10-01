const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
  status: { type: String, default: 'Active' },
  //   bugs: [{ type: Schema.types.ObjectId, ref: "Bugs" }],
});

module.exports = mongoose.model("Project", projectSchema);
