import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import { BASE_URL } from "../constants";

import toast from "react-hot-toast";


const MyOrdersPage = () => {

    const [orders, setOrders] =
        useState([]);


    const { userInfo } = useSelector(
        (state) => state.auth
    );


    useEffect(() => {

        const fetchOrders =
            async () => {

                const { data } =
                    await axios.get(

                        `${BASE_URL}/api/orders/myorders`,

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${userInfo.token}`,
                            },
                        }
                    );

                setOrders(data);
            };

        fetchOrders();

    }, [userInfo]);

    const payNowHandler =
        async (order) => {

            try {

                const { data } =
                    await axios.post(

                        `${BASE_URL}/api/payments/create-order`,

                        {
                            amount: order.totalPrice,
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
                        "Retry Payment",

                    order_id: data.id,


                    handler: async function () {

                        await axios.put(

                            `${BASE_URL}/api/orders/${order._id}/pay`,

                            {},

                            {
                                headers: {

                                    Authorization:
                                        `Bearer ${userInfo.token}`,
                                },
                            }
                        );


                        window.location.reload();
                    },
                };


                const razorpay =
                    new window.Razorpay(options);

                razorpay.open();

            } catch (error) {

                toast.error(error.response?.data?.message || "Something went wrong");
            }
        };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">

            <h1 className="text-4xl font-bold mb-10">

                My Orders

            </h1>


            {orders.length === 0 ? (

                <p>No orders yet.</p>

            ) : (

                <div className="space-y-6">

                    {orders.map((order) => (

                        <div
                            key={order._id}
                            className="border p-6 rounded-2xl shadow-lg bg-white"
                        >

                            {/* TOP SECTION */}
                            <div className="flex justify-between items-start mb-8">

                                {/* LEFT */}
                                <div>

                                    <h2 className="text-2xl font-bold">

                                        Ordered On: {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}

                                    </h2>


                                    <h3 className="text-3xl font-bold mt-6">

                                        ₹{order.totalPrice}

                                    </h3>

                                </div>


                                {/* RIGHT */}
                                <div className="text-right flex flex-col items-end">

                                    <h2
                                        className={`text-2xl font-bold ${order.isPaid
                                            ? "text-green-600"
                                            : "text-red-500"
                                            }`}
                                    >

                                        {order.isPaid
                                            ? "Paid"
                                            : "Unpaid"}

                                    </h2>


                                    {!order.isPaid && (

                                        <button
                                            onClick={() =>
                                                payNowHandler(order)
                                            }
                                            className="bg-black text-white px-5 py-2 rounded-xl mt-3 hover:bg-gray-800 transition"
                                        >

                                            Pay Now

                                        </button>

                                    )}

                                    <p
                                        className={`mt-2 font-semibold ${order.isDelivered
                                                ? "text-green-600"
                                                : "text-orange-500"
                                            }`}
                                    >

                                        {order.isDelivered
                                            ? "Delivered"
                                            : "Processing"}

                                    </p>


                                    <p className="text-gray-400 mt-4 text-sm break-all max-w-xs">

                                        Order ID:{order._id}

                                    </p>

                                </div>

                            </div>


                            {/* PRODUCTS */}
                            <div className="space-y-4">

                                {order.orderItems.map((item) => (

                                    <div
                                        key={item.product}
                                        className="flex items-center gap-5 border rounded-xl p-4"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />


                                        <div>

                                            <h3 className="text-xl font-semibold">

                                                {item.title}

                                            </h3>


                                            <p className="text-gray-500 mt-1">

                                                Quantity:
                                                {item.quantity}

                                            </p>


                                            <p className="font-bold text-lg mt-2">

                                                ₹{item.price}

                                            </p>

                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default MyOrdersPage;