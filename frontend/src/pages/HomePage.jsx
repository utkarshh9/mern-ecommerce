import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import { fetchProducts } from "../api/productApi";


const HomePage = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

    </div>
  );
};

export default HomePage;