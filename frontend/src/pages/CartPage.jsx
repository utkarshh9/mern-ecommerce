import { useSelector, useDispatch } from "react-redux";

import { removeFromCart } from "../redux/slices/cartSlice";


const CartPage = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );


    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Shopping Cart
            </h1>


            {cartItems.length === 0 ? (

                <p>Your cart is empty</p>

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

                                <p className="mt-2">
                                    Quantity: {item.quantity}
                                </p>

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

        </div>
    );
};

export default CartPage;