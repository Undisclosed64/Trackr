const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  //get auth header
  const authHeader = req.headers.authorization;

  //split auth header
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    //verify token
    jwt.verify(token, process.env.key, (err, user) => {
      if (err) {
        res.json({
          status: 403,
          message: "Toekn is invalid!",
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.json({
      status: 403,
      message: "You are not authorized to access this route!",
    });
  }
};

module.exports = verify;
