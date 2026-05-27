import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import { BASE_URL } from "../constants";


const AdminProductsPage = () => {

    const [products, setProducts] = useState([]);

    const { userInfo } = useSelector(
        (state) => state.auth
    );


    const fetchProducts = async () => {

        const { data } = await axios.get(
            `${BASE_URL}/api/products`
        );

        setProducts(data);
    };


    useEffect(() => {

        fetchProducts();

    }, []);


    const deleteHandler = async (id) => {

        if (
            window.confirm(
                "Delete this product?"
            )
        ) {

            await axios.delete(

                `${BASE_URL}/api/products/${id}`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${userInfo.token}`,
                    },
                }
            );

            fetchProducts();
        }
    };


    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Manage Products

                </h1>

                <button
                    onClick={() =>
                        window.location.href =
                        "/admin/products/create"
                    }
                    className="bg-black text-white px-5 py-3 rounded-lg"
                >

                    Create Product

                </button>

            </div>


            <div className="overflow-x-auto">

                <table className="w-full border">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 border">
                                Image
                            </th>

                            <th className="p-4 border">
                                Title
                            </th>

                            <th className="p-4 border">
                                Price
                            </th>

                            <th className="p-4 border">
                                Category
                            </th>

                            <th className="p-4 border">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {products.map((product) => (

                            <tr key={product._id}>

                                <td className="p-4 border">

                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-28 h-28 object-cover rounded-lg mx-auto"
                                    />

                                </td>


                                <td className="p-4 border">

                                    {product.title}

                                </td>


                                <td className="p-4 border">

                                    ${product.price}

                                </td>


                                <td className="p-4 border">

                                    {product.category}

                                </td>


                                <td className="p-4 border">

                                    <div className="flex items-center justify-center gap-3">

                                        <button
                                            onClick={() =>
                                                window.location.href =
                                                `/admin/products/${product._id}/edit`
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                        >

                                            Edit

                                        </button>


                                        <button
                                            onClick={() =>
                                                deleteHandler(product._id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                        >

                                            Delete

                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminProductsPage;