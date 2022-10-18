const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = [
  //validate input fields
  check("firstName").not().isEmpty().withMessage("First name can not be empty"),
  check("email").isEmail().withMessage("Please enter a valid email address"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),

  async (req, res) => {
    //check for errors in req data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      //create user object
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      //secure the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      //save the user
      user.save((err, created_user) => {
        if (err) res.status(500).json(err);
        res.json(created_user);
      });
    }
  },
];

exports.logUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  //check if email is registered or not
  if (user === null) {
    res.status(404).json({ msg: "Email is not registered!" });
    return;
  }

  //check if password is correct or not
  if (await bcrypt.compare(req.body.password, user.password)) {
    //generate an access token
    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.key,
      { expiresIn: "10h" }
    );
    //return user info and token
    res.json({
      user,
      accessToken,
    });
  } else {
    res.status(401).json({ msg: "Password is incorrect!" });
  }
};

// exports.deleteAll = function (req, res) {
//   User.remove({}, function(err,success){
//     if(err)res.json(err);
//     res.json(success)
//   })
// };

exports.verifyUser = (req, res) => {
  const user = req.user;
  // console.log(user);
  res.json({ user: user });
};
