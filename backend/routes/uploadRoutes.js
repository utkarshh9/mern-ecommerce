const express = require("express");

const multer = require("multer");

const cloudinary =
  require("../config/cloudinary");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");


const router = express.Router();


const storage = multer.memoryStorage();

const upload = multer({
  storage,
});


router.post(

  "/",

  protect,

  admin,

  upload.single("image"),

  async (req, res) => {

    try {

      const result =
        await cloudinary.uploader.upload(

          `data:${req.file.mimetype};base64,${
            req.file.buffer.toString("base64")
          }`
        );


      res.json({
        imageUrl: result.secure_url,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);


module.exports = router;