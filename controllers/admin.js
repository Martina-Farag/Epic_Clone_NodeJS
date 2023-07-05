var AdminModel = require("../models/admin");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function login(req, res) {
  var { userName, Password } = req.body;
  var admin = await AdminModel.findOne({ userName });
  if (admin) {
    var valid = bcrypt.compareSync(Password, admin.Password);
    if (valid) {
      var token = jwt.sign(
        {
          adminId: admin._id,
          displayName: admin.displayName,
        },
        process.env.SECRET
      );
      res.status(200).json({ token, admin });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "Admin Not Found" });
  }
}

module.exports = {login};
