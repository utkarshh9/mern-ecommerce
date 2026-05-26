const express = require("express");

const router = express.Router();

const {
  placeOrder, payOrder, getMyOrders,
} = require("../controllers/orderController");

const {
  protect,
} = require("../middleware/authMiddleware");


router.post(
  "/",
  protect,
  placeOrder
);

router.put(
  "/:id/pay",
  protect,
  payOrder
);

router.get(
  "/myorders",
  protect,
  getMyOrders
);


module.exports = router;