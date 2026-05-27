import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import { fetchProducts } from "../api/productApi";


const HomePage = () => {

    const [products, setProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [sortOption,
        setSortOption] =
        useState("");

    const [loading, setLoading] = useState(true);

    const filteredProducts =
        [...products]

            .filter((product) => {

                const matchesSearch =
                    product.title
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        );

                const matchesCategory =

                    selectedCategory === "All" ||

                    product.category ===
                    selectedCategory;

                return (
                    matchesSearch &&
                    matchesCategory
                );
            })

            .sort((a, b) => {

                if (
                    sortOption ===
                    "price-low"
                ) {

                    return a.price - b.price;
                }

                if (
                    sortOption ===
                    "price-high"
                ) {

                    return b.price - a.price;
                }

                if (
                    sortOption ===
                    "rating"
                ) {

                    return b.rating - a.rating;
                }

                return 0;
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
                    className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
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

                <select
                    value={sortOption}
                    onChange={(e) =>
                        setSortOption(
                            e.target.value
                        )
                    }
                    className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition"
                >

                    <option value="">
                        Newest
                    </option>

                    <option value="price-low">
                        Price Low-High
                    </option>

                    <option value="price-high">
                        Price High-Low
                    </option>

                    <option value="rating">
                        Highest Rated
                    </option>

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