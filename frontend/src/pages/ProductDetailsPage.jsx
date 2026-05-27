import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { fetchSingleProduct } from "../api/productApi";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";

import { BASE_URL } from "../constants";

import axios from "axios";


const ProductDetailsPage = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const userInfo =
        useSelector(
            (state) => state.auth.userInfo
        );

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");


    useEffect(() => {

        const loadProduct = async () => {

            try {

                const data = await fetchSingleProduct(id);

                setProduct(data);

            } catch (error) {

                setError("Failed to load product");

            } finally {

                setLoading(false);

            }
        };

        loadProduct();

    }, [id]);


    if (loading) {
        return (
            <div className="text-center mt-10 text-2xl">
                Loading...
            </div>
        );
    }


    if (error) {
        return (
            <div className="text-center mt-10 text-red-500 text-2xl">
                {error}
            </div>
        );
    }

    const existingCartItem = cartItems.find(
        (item) => item._id === product?._id
    );

    const currentQuantity =
        existingCartItem?.quantity || 0;

    const submitReviewHandler =
        async (e) => {

            e.preventDefault();

            try {

                await axios.post(

                    `${BASE_URL}/api/products/${id}/reviews`,

                    {
                        rating,
                        comment,
                    },

                    {
                        headers: {

                            Authorization:
                                `Bearer ${userInfo.token}`,
                        },
                    }
                );

                setComment("");

                setRating(0);

                window.location.reload();

                window.location.reload();

            } catch (error) {

                console.log(error);

                alert(
                    error.response?.data?.message ||
                    error.message ||
                    "Review failed"
                );
            }
        };


    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            <div className="grid md:grid-cols-2 gap-10">

                <div>

                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full rounded-lg shadow-lg"
                    />

                </div>


                <div>

                    <h1 className="text-4xl font-bold">
                        {product.title}
                    </h1>

                    <p className="text-gray-600 mt-5">
                        {product.description}
                    </p>

                    <p className="text-3xl font-bold mt-6">
                        ${product.price}
                    </p>

                    <p className="mt-4 text-lg">
                        Category:
                        <span className="font-semibold ml-2">
                            {product.category}
                        </span>
                    </p>

                    <p className="mt-2 text-lg">
                        Stock:
                        <span className="font-semibold ml-2">
                            {product.stock}
                        </span>
                    </p>

                    <p
                        className={`mt-4 text-lg font-semibold ${product.stock > 0
                            ? "text-green-600"
                            : "text-red-500"
                            }`}
                    >

                        {product.stock > 0
                            ? "In Stock"
                            : "Out Of Stock"}

                    </p>


                    <button
                        onClick={() => dispatch(addToCart(product))}
                        disabled={
                            product.stock === 0 ||
                            currentQuantity >= product.stock
                        }
                        className={`px-6 py-3 rounded-lg mt-8 text-white ${currentQuantity < product.stock
                            ? "bg-black hover:bg-gray-800"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >

                        Add To Cart

                    </button>

                    {currentQuantity >= product.stock &&
                        product.stock > 0 && (

                            <p className="text-red-500 mt-4">

                                Maximum available stock reached

                            </p>

                        )}

                </div>

            </div>

            <p className="mt-4 text-yellow-500 font-semibold">

                ⭐ {product.rating?.toFixed(1)}

                ({product.numReviews} reviews)

            </p>

            <div className="mt-12">

                <h2 className="text-3xl font-bold mb-6">

                    Reviews

                </h2>


                {product.reviews?.length === 0 && (

                    <p>No reviews yet</p>
                )}


                <div className="space-y-6">

                    {product.reviews?.map((review) => (

                        <div
                            key={review._id}
                            className="border p-5 rounded-xl"
                        >

                            <h3 className="font-bold text-lg">

                                {review.name}

                            </h3>


                            <p className="text-yellow-500 font-semibold mt-1">

                                {"⭐".repeat(review.rating)}

                            </p>


                            <p className="mt-3 text-gray-700">

                                {review.comment}

                            </p>

                        </div>
                    ))}

                </div>

            </div>

            {userInfo && (

                <form
                    onSubmit={submitReviewHandler}
                    className="mt-10 border p-6 rounded-xl"
                >

                    <h3 className="text-2xl font-bold mb-4">

                        Write a Review

                    </h3>


                    <select
                        value={rating}
                        onChange={(e) =>
                            setRating(e.target.value)
                        }
                        className="w-full border p-3 rounded-lg mb-4"
                        required
                    >

                        <option value="">

                            Select Rating

                        </option>

                        <option value="1">1</option>

                        <option value="2">2</option>

                        <option value="3">3</option>

                        <option value="4">4</option>

                        <option value="5">5</option>

                    </select>


                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        placeholder="Write your review"
                        className="w-full border p-3 rounded-lg mb-4"
                        required
                    />


                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 rounded-xl"
                    >

                        Submit Review

                    </button>

                </form>
            )}

        </div>
    );
};

export default ProductDetailsPage;