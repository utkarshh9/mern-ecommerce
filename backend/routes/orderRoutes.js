const express = require("express");

const router = express.Router();

const {
  placeOrder, payOrder, getMyOrders, markOrderDelivered, getAllOrders,
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

router.get(
  "/",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/:id/deliver",
  protect,
  admin,
  markOrderDelivered
);

module.exports = router;