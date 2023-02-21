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
        res.status(403).json({
          message: "Token is invalid! Please login again!",
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json({
      message: "You are not authorized to access this route. Please log in.",
    });
  }
};

module.exports = verify;
