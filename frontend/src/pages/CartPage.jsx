import { useSelector, useDispatch } from "react-redux";

import { useNavigate, Link, } from "react-router-dom";

import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../redux/slices/cartSlice";

import toast from "react-hot-toast";


const CartPage = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const navigate = useNavigate();


    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Shopping Cart
            </h1>


            {cartItems.length === 0 ? (

                <div className="text-center text-2xl text-gray-500">
                    Your cart is empty
                </div>

            ) : (

                <div className="space-y-6">

                    {cartItems.map((item) => (

                        <div
                            key={item._id}
                            className="flex items-center gap-6 border p-4 rounded-lg"
                        >

                            <Link to={`/product/${item._id}`}>

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded-lg hover:scale-105 transition duration-300 cursor-pointer"
                                />

                            </Link>

                            <div className="flex-1">

                                <h2 className="text-2xl font-semibold">
                                    {item.title}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    ₹{item.price}
                                </p>

                                <div className="flex items-center gap-4 mt-3">

                                    <button
                                        onClick={() =>
                                            dispatch(decreaseQuantity(item._id))
                                        }
                                        className="bg-gray-200 px-3 py-1 rounded"
                                    >
                                        -
                                    </button>

                                    <span className="text-lg font-semibold">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            dispatch(increaseQuantity(item._id))
                                        }

                                        disabled={item.quantity >= item.stock}

                                        className={`px-3 py-1 rounded ${item.quantity >= item.stock
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        +
                                    </button>

                                </div>

                                {item.quantity >= item.stock && (

                                    <p className="text-red-500 mt-2">

                                        Maximum available stock reached

                                    </p>

                                )}

                            </div>


                            <button
                                onClick={() => {
                                    dispatch(removeFromCart(item._id));
                                    toast.success("Item removed from cart");
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >

                                Remove

                            </button>

                        </div>
                    ))}

                </div>
            )}
            {cartItems.length > 0 && (

                <div className="mt-10 text-right">

                    <h2 className="text-3xl font-bold">

                        Total: ₹{totalPrice.toFixed(2)}

                    </h2>

                    <button
                        onClick={() =>
                            navigate("/shipping")
                        }
                        className="bg-black text-white px-6 py-3 rounded-lg mt-6"
                    >

                        Proceed To Checkout

                    </button>

                </div>

            )}

        </div>
    );
};

export default CartPage;