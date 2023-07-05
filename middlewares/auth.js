const jwt = require("jsonwebtoken");


function auth(req, res, next) {
  var { authorization } = req.headers;
  if (authorization) {
    jwt.verify(
      authorization,
      process.env.SECRET,
      function (err, decodedSuccess) {
        if (err) {
          res.status(401).json({ message: err.message });
        }
        if (decodedSuccess) {
          // req.userName = decodedSuccess.userName;
          req.name = decodedSuccess.name;
          req.userId = decodedSuccess.userId;
          next();
        } else {
          res
            .status(401)
            .json({ message: "You are not authorized, Login please" });
        }
      }
    );
  } else {
    res.status(401).end();
  }
}

module.exports = { auth };
