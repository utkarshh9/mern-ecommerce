import { useEffect, useState }
    from "react";

import axios from "axios";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { useSelector }
    from "react-redux";


const AdminEditProductPage = () => {

    const { id } = useParams();

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

    const [uploading, setUploading] =
        useState(false);


    useEffect(() => {

        const fetchProduct = async () => {

            const { data } = await axios.get(

                `http://localhost:5000/api/products/${id}`
            );


            setTitle(data.title);

            setDescription(data.description);

            setPrice(data.price);

            setCategory(data.category);

            setStock(data.stock);

            setImage(data.image);
        };

        fetchProduct();

    }, [id]);


    const uploadFileHandler =
        async (e) => {

            const file = e.target.files[0];

            const formData = new FormData();

            formData.append("image", file);


            setUploading(true);


            try {

                const { data } = await axios.post(

                    "http://localhost:5000/api/upload",

                    formData,

                    {
                        headers: {

                            "Content-Type":
                                "multipart/form-data",

                            Authorization:
                                `Bearer ${userInfo.token}`,
                        },
                    }
                );


                setImage(data.imageUrl);

                setUploading(false);

            } catch (error) {

                console.log(error);

                setUploading(false);
            }
        };


    const submitHandler = async (e) => {

        e.preventDefault();

        await axios.put(

            `http://localhost:5000/api/products/${id}`,

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

                Edit Product

            </h1>


            <form
                onSubmit={submitHandler}
                className="space-y-5"
            >

                <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                />


                <textarea
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                />


                <input
                    type="number"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                />


                <input
                    type="text"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                />


                <input
                    type="number"
                    value={stock}
                    onChange={(e) =>
                        setStock(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                />


                <input
                    type="text"
                    value={image}
                    onChange={(e) =>
                        setImage(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                />


                <div>

                    <label className="block mb-2 font-semibold">

                        Upload Product Image

                    </label>

                    <input
                        type="file"
                        onChange={uploadFileHandler}
                        className="w-full border p-3 rounded-lg bg-white"
                    />

                </div>


                {uploading && (
                    <p>Uploading...</p>
                )}


                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg"
                >

                    Update Product

                </button>

            </form>

        </div>
    );
};

export default AdminEditProductPage;