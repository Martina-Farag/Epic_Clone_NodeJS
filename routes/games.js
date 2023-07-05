
const express = require("express");
var router = express.Router();
const Game = require("../models/games");
const { getGameById,getMostPopularGames,getTopSellerGames,getMostPlayedGames,createGame,updateGameById,deleteGame,getGenresName,getGamesByGenresId,getNewestGamesBycreatedAt } = require("../controllers/game");
const gameModel = require('../models/games');
const categoryModel = require("../models/categories");

const { auth } = require('../middlewares/auth')

router.use(auth)

router.get("/:id", async (req, res) => {   // get game by id
  
  var id = req.params.id;
    try {
        var game = await getGameById(id);
        res.json( game );
    } catch (error) {
        res.status(422).json({message: error.message});
    }

});

// mostPopular | topSeller | mostPlayed
router.get("/get/mostPopular", async (req, res, next) => {   // get mostPopular games by mostPopular

  try {
    var games = await getMostPopularGames();
    res.json( games[0] );
  } catch (error) {
      res.status(422).json({message: error.message});
  }

});

router.get("/get/topSeller", async (req, res, next) => {   // get topSeller games by topSeller

  try {
    var games = await getTopSellerGames();
    res.json( games[0] );
  } catch (error) {
      res.status(422).json({message: error.message});
  }

});

router.get("/get/mostPlayed", async (req, res, next) => {   // get mostPlayed games by mostPlayed

  try {
    var games = await getMostPlayedGames(); 
    res.json( games );
  } catch (error) {
      res.status(422).json({message: error.message});
  }

});

router.post("/", async (req, res, next) => {    // save new game

  var game = req.body;
  try {
    var savedgame = await createGame(game);
    res.status(201).json(savedgame);
  } catch (error) {
    res.status(422).json({message: error.message});
  }

});

router.patch("/:id", async (req, res) => {   // update new game

  var id = req.params.id;
  var obj = req.body;
  try {
    var updatedGame = await updateGameById(id, obj);
    res.json({message: 'Game updated successfully'})
  } catch (error) {
    res.status(422).json({message: error.message});
  }

});

router.delete("/:id", async (req, res) => {   // delete game

  var id = req.params.id;
  try {
    var deletedGame = await deleteGame(id);
    res.json({message: 'Game deleted successfully'});
  } catch (error) {
    res.status(422).json({message: error.message});
  }

});

// all games genres id = id > name : 'action'
// /genres/:id/categories
// /Genres/:id/Categorys
// /genres:id/categories
// router.get('/genres/:id/categories', async (req, res) => { // get category name by Genres id 

//   var genresId = req.params.id;
//   try {
//       var GenresName = await getGenresName(genresId);
//       // var GenresName = await getGenresName(genresId).populate();
//       res.json( GenresName );
//   } catch (error) {
//       res.status(422).json({message: error.message});
//   }

// });

router.get("/:id/genres", async (req, res, next) => {    // get all categories name by Genres of one game
    var id = req.params.id;
    var cat = [];
    try {
      var game = await gameModel.find({_id:id})
      var List = game[0].Genres;
        // console.log(game[0].Genres);
      for (let i = 0; i < List.length; i++){
        cat[i] = await categoryModel.find({_id:List[i]})
      }
      // cat[0][0].name  >  'action'
      console.log(cat[0][0].name + ' ' + cat[1][0].name);  // > action shoter  // open git bash terminal for node to see the log
      res.status(200).json(cat);

      // res.status(200).json(cat[0][0].name);
      // res.status(200).json(cat[1][0].name);
     
    } catch (err) {
      res.json({ message: err.message });
    }
  });


router.get('/genres/:id', async (req, res) => { // get all games of Category id (action) 

  var genresId = req.params.id;
  try {
      var games = await getGamesByGenresId(genresId);
      res.json( games );
  } catch (error) {
      res.status(422).json({message: error.message});
  }

});

// createdAt    news
router.get("/", async (req, res, next) => {   // get newest games by createdAt
  
    try {
        var games = await getNewestGamesBycreatedAt();
        res.json( games );
    } catch (error) {
        res.status(422).json({message: error.message});
    }
});

module.exports = router;


// post localhost:5555/Games  | 
//         
// {
//   "gameName": "Valorant",
//   "Description": "update",
//   "PlatForm": "windows",
//   "Developer": "Riot Games",
//   "MostPopular": true,
//   "TopSeller": true,
//   "MostPlayed": true,
//   "PublisherName": "Riot Games",
//   "Photos": ["https://youtu.be/le474A3jBxA"],
//   "VideoURL": "https://youtu.be/le474A3jBxA",
//   "Rating": 4.5,
//   "Price": "free",
//   "Genres": ["640b7c7b663222e219a76bbf", "640b7ceb663222e219a76bc3"]
// }

// get  localhost:5555/Games/640b61e5b01114b40661429f   |   get game by id
// patch localhost:5555/Games/640b61e5b01114b40661429f  |   updated  game
// delete localhost:5555/Games/640b61e5b01114b40661429f  |   delete  game
// get localhost:5555/Games/genres/640b7ceb663222e219a76bc3   |  all games with specific category  |  get('/genres/:id') 
//// get localhost:5555/Games/genres/640b7ceb663222e219a76bc3/categories   |  get category name by Genres id  |  get('/genres/:id/categories') 
// get localhost:5555/Games/640b60098ab7661566c1323c/genres     | get all categories for one game   |  get("/:id/genres")
// get localhost:5555/Games/get/mostPopular
// get localhost:5555/Games/get/topSeller
// get localhost:5555/Games/get/mostPlayed
/// cheack authentication:-
// post localhost:5555/Games  |  {"title":"my games","userId":"640351ff41fe0f05acd7c034"}