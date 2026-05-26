const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            required: true,

            ref: "User",
        },


        orderItems: [

            {

                title: String,

                quantity: Number,

                image: String,

                price: Number,

                product: {

                    type:
                        mongoose.Schema.Types.ObjectId,

                    ref: "Product",
                },
            },
        ],


        shippingAddress: {

            address: String,

            city: String,

            postalCode: String,

            country: String,
        },


        totalPrice: {

            type: Number,

            required: true,
        },


        isPaid: {

            type: Boolean,

            default: false,
        },

        paidAt: {
            type: Date,
        },

    },

    {
        timestamps: true,
    }
);


const Order = mongoose.model(
    "Order",
    orderSchema
);

module.exports = Order;