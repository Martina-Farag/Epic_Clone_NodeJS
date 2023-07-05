const express = require("express");
var router = express();

var AdminModel = require("../models/admin");
const {login} = require("../controllers/admin");

router.get("/", async(req, res, next) => {   // get all admins
  try{
    var AdminList=await AdminModel.find();
    res.status(200).json(AdminList)
  }catch(err){
    res.status(422).json({ message: err.message });
  }
});

router.post("/", async (req, res, next) => {   // create admin
  try {
    var Admin = req.body;
    var savedAdmin = await AdminModel.create(Admin);
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {   // delete admin
  var id = req.params.id;
  try {
    var deletedAdmin = await AdminModel.deleteOne({ _id: id });
    res.status(200).json(deletedAdmin);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/login", login);

module.exports = router;
