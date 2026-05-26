import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (

    <Link to={`/product/${product._id}`}>

      <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition duration-300">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 object-cover rounded-md"
        />

        <h2 className="text-xl font-semibold mt-3">
          {product.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <p className="text-2xl font-bold mt-3">
          ${product.price}
        </p>

      </div>

    </Link>
  );
};

export default ProductCard;