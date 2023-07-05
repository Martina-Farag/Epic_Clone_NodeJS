const gameModel = require("../models/games");
const categoryModel = require("../models/categories");



function updateGameById(id, obj) {
  // return gameModel.findByIdAndUpdate(id, obj, { new: true });
  return gameModel.findByIdAndUpdate(id, obj)
}

function getGameById(id) {
  return gameModel.findById(id);  //findOne({_id: id})
}

function getMostPopularGames() {
  return gameModel.find({mostPopular: true});
}

function getTopSellerGames() {
  return gameModel.find({topSeller: true});
}

function getMostPlayedGames() {
  return gameModel.find({mostPlayed: true});
}

function createGame(game) {
  return gameModel.create(game);
}

function deleteGame(id) {
  return gameModel.deleteOne({_id: id});
}

function getGenresName (id){
  let category = categoryModel.findOne({_id: id});
  return category //[0].name;
}

function getGamesByGenresId(id){
  // return gameModel.find({_id: id});
  // .sort({_id:-1})
  return gameModel.find( { Genres: id } )
}

function getNewestGamesBycreatedAt(){
  return gameModel.find().sort({createdAt:1})
}

module.exports = { getGameById,getMostPopularGames,getTopSellerGames,getMostPlayedGames,createGame,updateGameById,deleteGame,getGenresName,getGamesByGenresId,getNewestGamesBycreatedAt };
