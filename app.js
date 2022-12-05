const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const bugsRouter = require("./routes/bugs");
const app = express();
const cors = require("cors");
const path = require("path");

mongoose.connect(
  process.env.MONGODB_URI
  //  {
  // //   useNewUrlParser: true,
  // //   useUnifiedTopology: true,
  // // }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/server", userRouter, projectRouter, bugsRouter);

//serve the frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
