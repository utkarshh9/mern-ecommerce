import { useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";


const AdminCreateProductPage = () => {

  const navigate = useNavigate();

  const { userInfo } = useSelector(
    (state) => state.auth
  );


  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] =
    useState("");

  const [stock, setStock] = useState("");

  const [image, setImage] = useState("");


  const submitHandler = async (e) => {

    e.preventDefault();

    await axios.post(

      "http://localhost:5000/api/products",

      {
        title,
        description,
        price,
        category,
        stock,
        image,
      },

      {
        headers: {
          Authorization:
            `Bearer ${userInfo.token}`,
        },
      }
    );

    navigate("/admin/products");
  };


  return (
    <div className="max-w-xl mx-auto mt-10 border p-8 rounded-xl shadow-lg">

      <h1 className="text-3xl font-bold mb-6">

        Create Product

      </h1>


      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />


        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >

          Create Product

        </button>

      </form>

    </div>
  );
};

export default AdminCreateProductPage;