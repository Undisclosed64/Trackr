const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user");
const projectRouter =  require("./routes/project");
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/server", userRouter);
app.use("/server", projectRouter);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
