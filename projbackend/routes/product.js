const express = require("express");
const router = express.Router();
const {
  getProductById,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllCategories,
} = require("../controllers/product");
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//handle param's
router.param("productId", getProductById);
router.param("userId", getUserById);

//actual routes
router.get("/product/:productId", getProduct);
//create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//update
router.put(
  "product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//delete
router.delete(
  "product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//listing route
router.get("/products", getAllProducts);

//get all categories
router.get("/products/categories", getAllCategories);
module.exports = router;
