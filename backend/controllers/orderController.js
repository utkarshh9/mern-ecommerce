const Order = require("../models/Order");

const Product = require("../models/Product");

const placeOrder = async (
    req,
    res
) => {

    try {

        const {
            orderItems,
            shippingAddress,
            totalPrice,
        } = req.body;


        if (
            orderItems &&
            orderItems.length === 0
        ) {

            return res.status(400).json({
                message: "No order items",
            });
        }


        const order = new Order({

            orderItems,

            user: req.user._id,

            shippingAddress,

            totalPrice,

        });


        const createdOrder =
            await order.save();

        for (const item of orderItems) {

            const product =
                await Product.findById(
                    item._id
                );


            if (product) {

                if (product.stock < item.quantity) {

                    return res.status(400).json({
                        message:
                            `${product.title} is out of stock`,
                    });
                }

                product.stock =
                    product.stock - item.quantity;

                await product.save();
            }
        }


        res.status(201).json(
            createdOrder
        );

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

const payOrder = async (
    req,
    res
) => {

    try {

        const order =
            await Order.findById(
                req.params.id
            );


        if (order) {

            order.isPaid = true;

            order.paidAt = Date.now();


            const updatedOrder =
                await order.save();


            res.json(updatedOrder);

        } else {

            res.status(404);

            throw new Error(
                "Order not found"
            );
        }

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

const getMyOrders = async (
    req,
    res
) => {

    try {

        const orders =
            await Order.find({
                user: req.user._id,
            }).sort({
                createdAt: -1,
            });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {
    placeOrder,
    payOrder,
    getMyOrders,
};