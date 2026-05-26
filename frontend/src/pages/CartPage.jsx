import { useSelector, useDispatch } from "react-redux";

import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../redux/slices/cartSlice";


const CartPage = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );


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

                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-32 h-32 object-cover rounded-md"
                            />

                            <div className="flex-1">

                                <h2 className="text-2xl font-semibold">
                                    {item.title}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    ${item.price}
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
                                        className="bg-gray-200 px-3 py-1 rounded"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>


                            <button
                                onClick={() =>
                                    dispatch(removeFromCart(item._id))
                                }
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

                        Total: ${totalPrice.toFixed(2)}

                    </h2>

                </div>

            )}

        </div>
    );
};

export default CartPage;