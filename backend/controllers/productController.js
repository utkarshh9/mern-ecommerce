const Product = require("../models/Product");


// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL PRODUCTS
const getProducts =
  async (req, res) => {

    try {

      const keyword =
        req.query.keyword

          ? {
            title: {
              $regex:
                req.query.keyword,

              $options: "i",
            },
          }

          : {};


      const category =
        req.query.category

          ? {
            category:
              req.query.category,
          }

          : {};


      let sortOption = {
        createdAt: -1,
      };


      if (
        req.query.sort ===
        "price-low"
      ) {

        sortOption = {
          price: 1,
        };
      }


      if (
        req.query.sort ===
        "price-high"
      ) {

        sortOption = {
          price: -1,
        };
      }


      if (
        req.query.sort ===
        "rating"
      ) {

        sortOption = {
          rating: -1,
        };
      }


      const products =
        await Product.find({
          ...keyword,
          ...category,
        }).sort(sortOption);


      res.json(products);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };


// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createProductReview =
  async (req, res) => {

    try {

      const {
        rating,
        comment,
      } = req.body;

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });
      }


      const alreadyReviewed =
        product.reviews.find(

          (review) =>

            review.user.toString() ===
            req.user._id.toString()
        );


      if (alreadyReviewed) {

        return res.status(400).json({
          message:
            "Product already reviewed",
        });
      }


      const review = {

        name: req.user.name,

        rating: Number(rating),

        comment,

        user: req.user._id,
      };


      product.reviews.push(review);

      product.numReviews =
        product.reviews.length;


      product.rating =

        product.reviews.reduce(

          (acc, item) =>

            item.rating + acc,

          0
        ) / product.reviews.length;


      await product.save();

      res.status(201).json({
        message:
          "Review added",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  };


module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};