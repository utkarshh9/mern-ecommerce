import axios from "axios";

import {
    useSelector,
    useDispatch
}
    from "react-redux";

import { useNavigate } from "react-router-dom";

import { clearCart } from "../redux/slices/cartSlice";

import { BASE_URL } from "../constants";

import toast from "react-hot-toast";


const PlaceOrderPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const { cartItems } = useSelector(
        (state) => state.cart
    );


    const { userInfo } = useSelector(
        (state) => state.auth
    );


    const shippingAddress =
        JSON.parse(
            localStorage.getItem(
                "shippingAddress"
            )
        );


    const totalPrice =
        cartItems.reduce(

            (acc, item) =>

                acc +
                item.price * item.quantity,

            0
        );


    const placeOrderHandler =
        async () => {

            try {

                // CREATE UNPAID ORDER FIRST
                const { data: createdOrder } =
                    await axios.post(

                        `${BASE_URL}/api/orders`,

                        {

                            orderItems: cartItems,

                            shippingAddress,

                            totalPrice,

                        },

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${userInfo.token}`,
                            },
                        }
                    );


                // THEN CREATE RAZORPAY ORDER
                const { data } =
                    await axios.post(

                        `${BASE_URL}/api/payments/create-order`,

                        {
                            amount: totalPrice,
                        },

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${userInfo.token}`,
                            },
                        }
                    );


                const options = {

                    key:
                        import.meta.env
                            .VITE_RAZORPAY_KEY_ID,

                    amount: data.amount,

                    currency: data.currency,

                    name: "Negozio",

                    description:
                        "Order Payment",

                    order_id: data.id,


                    handler: async function () {

                        await axios.put(

                            `${BASE_URL}/api/orders/${createdOrder._id}/pay`,

                            {},

                            {
                                headers: {

                                    Authorization:
                                        `Bearer ${userInfo.token}`,
                                },
                            }
                        );


                        dispatch(clearCart());

toast.success(
    "Order placed successfully"
);

setTimeout(() => {

    navigate("/");

}, 500);
                    },


                    theme: {
                        color: "#000000",
                    },
                };


                const razorpay =
                    new window.Razorpay(
                        options
                    );

                razorpay.open();

            } catch (error) {

                toast.error(
    error.response?.data?.message ||
    "Order failed"
);
            }
        };

        const payLaterHandler =
    async () => {

        try {

            await axios.post(

                `${BASE_URL}/api/orders`,

                {

                    orderItems: cartItems,

                    shippingAddress,

                    totalPrice,

                },

                {
                    headers: {

                        Authorization:
                            `Bearer ${userInfo.token}`,
                    },
                }
            );

            dispatch(clearCart());

            toast.success(
                "Order placed successfully"
            );

            setTimeout(() => {

                navigate("/");

            }, 500);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Order failed"
            );
        }
    };


    return (
        <div className="max-w-5xl mx-auto py-10 px-4">

            <h1 className="text-4xl font-bold mb-10">

                Place Order

            </h1>


            <div className="grid md:grid-cols-2 gap-10">

                <div>

                    <h2 className="text-2xl font-bold mb-4">

                        Shipping

                    </h2>


                    <p>
                        {shippingAddress.address}
                    </p>

                    <p>
                        {shippingAddress.city}
                    </p>

                    <p>
                        {shippingAddress.postalCode}
                    </p>

                    <p>
                        {shippingAddress.country}
                    </p>

                </div>


                <div>

                    <h2 className="text-2xl font-bold mb-4">

                        Order Summary

                    </h2>


                    {cartItems.map((item) => (

                        <div
                            key={item._id}
                            className="flex justify-between mb-3"
                        >

                            <p>

                                {item.title} x
                                {item.quantity}

                            </p>

                            <p>

                                ₹
{(item.price * item.quantity)
    .toLocaleString("en-IN")}

                            </p>

                        </div>
                    ))}


                    <h2 className="text-3xl font-bold mt-8">

                        Total:
                        ₹
                        {totalPrice.toLocaleString("en-IN")}

                    </h2>


                    <div className="space-y-4 mt-8">

    <button
        onClick={placeOrderHandler}
        className="w-full bg-black text-white py-3 rounded-lg"
    >

        Pay Now

    </button>


    <button
        onClick={payLaterHandler}
        className="w-full border border-black py-3 rounded-lg hover:bg-gray-100 transition"
    >

        Pay Later

    </button>

</div>

                </div>

            </div>

        </div>
    );
};

export default PlaceOrderPage;