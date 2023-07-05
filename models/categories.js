const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const categoryModel = mongoose.model("Category", categorySchema); // create middleware, categoryModel carries categorySchema  //" Category : is the collection name

module.exports = categoryModel; // export categoryModel
