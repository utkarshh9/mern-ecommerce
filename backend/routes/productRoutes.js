const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");


// CREATE PRODUCT
router.post(
  "/",
  protect,
  admin,
  createProduct
);


// GET ALL PRODUCTS
router.get("/", getProducts);

// CREATE PRODUCT REVIEW
router.post(
  "/:id/reviews",
  protect,
  createProductReview
);

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);


// UPDATE PRODUCT
router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);


// DELETE PRODUCT
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);


module.exports = router;