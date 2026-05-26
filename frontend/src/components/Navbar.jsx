import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Navbar = () => {

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const totalItems = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
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

                    <button>
                        Login
                    </button>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;