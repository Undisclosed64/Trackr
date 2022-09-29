const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");

exports.createUser = [
  //validate input fields
  check("firstname").not().isEmpty().withMessage("First name can not be empty"),
  check("email").isEmail().withMessage("Please enter a valid email address"),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      //create user object
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      //secure the password
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) res.json(err);
          user.password = hash;
        });
      });

      //save the user
      user.save((err, created_user) => {
        if (err) res.status(500).json(err);
        res.json(created_user);
      });
    }
  },
];
