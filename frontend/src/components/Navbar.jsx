const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Negozio
        </h1>

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