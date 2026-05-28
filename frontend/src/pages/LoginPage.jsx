import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";

import { setCredentials } from "../redux/slices/authSlice";

import toast from "react-hot-toast";


const LoginPage = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] = useState("");


    const dispatch = useDispatch();

    const navigate = useNavigate();


    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser({
                email,
                password,
            });

            dispatch(setCredentials(data));


            setTimeout(() => {
                navigate("/");
            }, 500);
            toast.success("Login successful");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };


    return (
        <div className="max-w-md mx-auto mt-20 border p-8 rounded-xl shadow-lg">

            <h1 className="text-3xl font-bold mb-6">

                Login

            </h1>


            {error && (

                <p className="text-red-500 mb-4">

                    {error}

                </p>

            )}


            <form
                onSubmit={submitHandler}
                className="space-y-5"
            >

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                    required
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                    required
                />


                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                >

                    Login

                </button>

            </form>

        </div>
    );
};

export default LoginPage;