import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { fetchSingleProduct } from "../api/productApi";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";


const ProductDetailsPage = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


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


                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="bg-black text-white px-6 py-3 rounded-lg mt-8 hover:bg-gray-800"
                    >

                        Add To Cart

                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductDetailsPage;