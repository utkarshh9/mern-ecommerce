import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
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

      </div>

    </Link>
  );
};

export default ProductCard;