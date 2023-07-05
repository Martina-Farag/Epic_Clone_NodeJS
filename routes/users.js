var express = require("express");
var router = express.Router();
const userModel = require("../models/user");
const gameModel = require("../models/games");
const {
  AllUsers,
  getUserById,
  getpurchaseHistory,
  getCartList,
  getWishList,
  updateUserInfo,
  createUser,
  login,
  addToWishList,
  addToCartList,
  addTopurchaseHistory,
  addToCart,
  removeFromCart,
  removeFromWishList,
  addToPurchase,
} = require("../controllers/user");

router.get("/", async(req, res, next) => {   // get all users
  try{
    var usersList=await AllUsers()
    res.status(200).json(usersList)
  }catch(err){
    res.status(422).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {   // get user by id
  var id = req.params.id;
    try {
        var user = await getUserById(id);
        res.json( user );
    } catch (error) {
        res.status(422).json({message: error.message});
    }
});

router.post("/", createUser);
router.patch("/addToCart/:id/:gameId", addToCart);
router.patch("/addToWishList/:id/:gameId", addToWishList);
router.patch("/addToPurchase/:id", addToPurchase);
router.get("/getCart/:id", getCartList);
router.get("/getWishList/:id", getWishList);
router.get("/getPurchase/:id", getpurchaseHistory);
router.patch("/removeFromCart/:id/:gameId", removeFromCart);
router.patch("/removeFromWishList/:id/:gameId", removeFromWishList);

// router.get("/:id/wishList", getWishList);
// router.get("/:id/cart",getCartList );
// router.get("/:id/purchaseHistory", getpurchaseHistory);

// Add more than one user
// router.patch("/:id/wishList/:gameID", addToWishList);  // add to wish list

// router.patch("/:id/cart/:gameID",addToCartList );   // add to cart
// router.patch("/:id/purchaseHistory/:gameID", addTopurchaseHistory);  // add to purchase history

// router.patch("/:id", updateUserInfo);

router.delete("/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var deletedUser = await userModel.deleteOne({
      _id: id,
    });
    res.json(deletedUser);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/login", login);

module.exports = router;
