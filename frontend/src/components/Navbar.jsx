import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Navbar = () => {

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    return (
        <nav className="bg-black text-white px-6 py-4">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <Link to="/" className="text-2xl font-bold">
                    Negozio
                </Link>

                <div className="flex gap-6">

                    <Link to="/cart">
                        Cart ({cartItems.length})
                    </Link>

                    <button>
                        Login
                    </button>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;