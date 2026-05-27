import { Link } from "react-router-dom";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    addToWishlist,
    removeFromWishlist,
} from "../redux/slices/wishlistSlice";

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();

    const { wishlistItems } =
        useSelector(
            (state) => state.wishlist
        );


    const isWishlisted =
        wishlistItems.find(

            (item) =>
                item._id === product._id
        );
    return (

        <Link to={`/product/${product._id}`}>

            <div className="border rounded-xl p-4 shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-1 bg-white">

                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-52 object-cover rounded-md hover:scale-105 transition duration-300"
                />

                <h2 className="text-xl font-semibold mt-3">
                    {product.title}
                </h2>

                <p className="text-gray-600 mt-2">
                    {product.description}
                </p>

                <p className="text-2xl font-bold mt-3">
                    ${product.price.toLocaleString()}
                </p>

                <button

                    onClick={(e) => {

                        e.preventDefault();

                        isWishlisted

                            ? dispatch(
                                removeFromWishlist(
                                    product._id
                                )
                            )

                            : dispatch(
                                addToWishlist(product)
                            );
                    }}

                    className={`w-full py-2 rounded-lg mt-4 border transition ${isWishlisted
                            ? "bg-red-500 text-white"
                            : "bg-white text-black"
                        }`}
                >

                    {isWishlisted
                        ? "♥ Remove Wishlist"
                        : "♡ Add Wishlist"}

                </button>

            </div>

        </Link>
    );
};

export default ProductCard;