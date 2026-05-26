import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/authSlice";

const Navbar = () => {

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const totalItems = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const dispatch = useDispatch();

    const { userInfo } = useSelector(
        (state) => state.auth
    );

    return (
        <nav className="bg-black text-white px-6 py-4">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <Link to="/" className="text-2xl font-bold">
                    Negozio
                </Link>

                <div className="flex gap-6">

                    <Link to="/cart">
                        {totalItems > 0
                            ? `Cart (${totalItems})`
                            : "Cart"}
                    </Link>

                    {userInfo ? (

                        <div className="flex items-center gap-4">

                            <p>
                                Hi, {userInfo.name}
                            </p>

                            <button
                                onClick={() => dispatch(logout())}
                            >

                                Logout

                            </button>

                        </div>

                    ) : (

                        <div className="flex gap-4">

                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>

                        </div>

                    )}

                </div>

            </div>

        </nav>
    );
};

export default Navbar;