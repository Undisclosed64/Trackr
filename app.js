const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const bugsRouter = require("./routes/bugs");
const app = express();
const cors = require("cors");
const User = require("./models/user");
const path = require("path");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const session = require("express-session");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/server", userRouter, projectRouter, bugsRouter);

//serve the frontend
app.use(express.static("client/build"));

app.use(
  session({
    secret: process.env.key,
    resave: false,
    saveUninitialized: true,
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

console.log(process.env.clientID);
//google login strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "https://trackr.cyclic.app/auth/google/callback",
    },

    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ email: profile.emails[0].value }, function (err, user) {
        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          });
          user.save(function (err) {
            return cb(err, user);
          });
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

//redirect to google login page
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//handle the response from google after user grants/denies permission
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log(req.user);
    const accessToken = jwt.sign({ email: req.user.email }, process.env.key, {
      expiresIn: "10h",
    });

    // res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("accessToken", accessToken);

    // Successful authentication, redirect home.
    res.redirect(`https://trackr.cyclic.app/home`);
  }
);

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client", "build", "index.html"),
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
