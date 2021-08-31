const express = require("express");
const router = express.Router();

//getting controllers
const {
  getUserById,
  getUser,
  updateUser,
  getUserPurchaseList,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//put=>update
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//get=>user purchase list
router.get("/orders/user/:userId", isSignedIn, isAdmin, getUserPurchaseList);


module.exports = router;
