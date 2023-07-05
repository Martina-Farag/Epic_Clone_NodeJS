const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
    gameName: {
      type: String,
      trim: true,
      // required: true
    },
    Description: {
      type: String,
      // required: true,
      trim: true,
    },
    Discription_ar: {
      type: String,
      // required: true,
      trim: true,
    },
    platForm: {
      type: String,
      trim: true,
      // required: true
    },
    Developer: {
      type: String,
      trim: true,
      // required: true
    },
    mostPopular: {
      type: Boolean,
      default: false,
    },
    topSeller: {
      type: Boolean,
      default: false,
    },
    mostPlayed: {
      type: Boolean,
      default: false,
    },
    publisherName: {
      type: String,
      // required: true,
      trim: true,
    },
    Photos: {
      type: [String],
      default: [""],
    },
    VideoURL: {
      type: String,
      // required: true
    },
    Rating: {
      type: Number,
      default: 0,
    },
    Price: {
      type: String,
      default: "Free",
    },
    Genres: {
      type: [mongoose.SchemaTypes.ObjectId],
      // type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Game", gameSchema);
const gameModel = mongoose.model("Game", gameSchema); // create middleware, gameModel carries gameShema  //" Game : is the collection name

module.exports = gameModel; // export gameModel
