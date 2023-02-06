const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
