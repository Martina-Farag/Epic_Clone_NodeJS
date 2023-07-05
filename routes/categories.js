const express = require("express");
var router = express();
const Category = require("../models/categories");

const { auth } = require('../middlewares/auth')
router.use(auth)


router.get("/", async (req, res) => {   // get all categories

  try {
    var categoryList = await Category.find();
    res.status(201).json(categoryList);
  } catch (error) {
    res.status(422).json({message: error.message});
  }
});

router.get("/:id", async (req, res) => {   // get category by id
  var id = req.params.id;

  try {
    var category = await Category.findById(id);
    res.status(201).json(category);
  } catch (error) {
    res.status(422).json({message: error.message});
  }
});

router.post("/", async (req, res) => {   // create category
  var cat = req.body;

  try {
    var savedcat = await  Category.create(cat);
    res.status(201).json(savedcat);
  } catch (error) {
    res.status(422).json({message: error.message});
  }
});

router.delete("/:id", async(req, res) => {
  var id = req.params.id;

  try {
    var category = await Category.deleteOne({_id: id});
    res.status(201).json(category);
  } catch (error) {
    res.status(422).json({message: error.message});
  }
});

module.exports = router;
