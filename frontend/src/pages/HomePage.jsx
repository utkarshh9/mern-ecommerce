import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import { fetchProducts } from "../api/productApi";


const HomePage = () => {

    const [products, setProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [loading, setLoading] = useState(true);

    const filteredProducts = products.filter((product) => {

        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const categories = [
        "All",
        ...new Set(products.map((product) => product.category)),
    ];


    useEffect(() => {

        const loadProducts = async () => {

            try {

                const data = await fetchProducts();

                setProducts(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        loadProducts();

    }, []);


    if (loading) {
        return (
            <div className="text-center mt-10 text-2xl">
                Loading...
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Latest Products
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-10">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-3 rounded-lg flex-1"
                />


                <select
                    value={selectedCategory}
                    onChange={(e) =>
                        setSelectedCategory(e.target.value)
                    }
                    className="border p-3 rounded-lg"
                >

                    {categories.map((category) => (

                        <option
                            key={category}
                            value={category}
                        >
                            {category}
                        </option>

                    ))}

                </select>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {filteredProducts.map((product) => (

                    <ProductCard
                        key={product._id}
                        product={product}
                    />

                ))}

            </div>

            {filteredProducts.length === 0 && (

                <div className="text-center mt-10 text-2xl text-gray-500">

                    No products found

                </div>

            )}

        </div>
    );
};

export default HomePage;