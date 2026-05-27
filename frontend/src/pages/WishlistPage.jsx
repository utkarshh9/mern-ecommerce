import {
    useSelector,
    useDispatch,
} from "react-redux";

import {
    removeFromWishlist,
} from "../redux/slices/wishlistSlice";

import { Link }
    from "react-router-dom";


const WishlistPage = () => {

    const dispatch =
        useDispatch();

    const { wishlistItems } =
        useSelector(
            (state) => state.wishlist
        );


    return (

        <div className="max-w-6xl mx-auto py-10 px-4">

            <h1 className="text-4xl font-bold mb-10">

                Wishlist

            </h1>


            {wishlistItems.length === 0 ? (

                <p className="text-xl">

                    Your wishlist is empty

                </p>

            ) : (

                <div className="grid md:grid-cols-3 gap-8">

                    {wishlistItems.map((product) => (

                        <div
                            key={product._id}
                            className="border rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 bg-white"
                        >

                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-64 object-cover rounded-xl"
                            />


                            <h2 className="text-2xl font-bold mt-4">

                                {product.title}

                            </h2>


                            <p className="text-xl font-semibold mt-2">

                                ₹{product.price}

                            </p>


                            <div className="flex gap-3 mt-5">

                                <Link
                                    to={`/product/${product._id}`}
                                    className="bg-black text-white px-4 py-2 rounded-lg"
                                >

                                    View

                                </Link>


                                <button
                                    onClick={() =>
                                        dispatch(
                                            removeFromWishlist(
                                                product._id
                                            )
                                        )
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >

                                    Remove

                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default WishlistPage;