import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-black text-white px-6 py-4">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <Link to="/" className="text-2xl font-bold">
                    Negozio
                </Link>

                <div className="flex gap-6">

                    <button>
                        Cart
                    </button>

                    <button>
                        Login
                    </button>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;