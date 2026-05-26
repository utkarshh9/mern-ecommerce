import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";

import ProductDetailsPage from "./pages/ProductDetailsPage";

import CartPage from "./pages/CartPage";


function App() {
  return (
    <div>

      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route
          path="/product/:id"
          element={<ProductDetailsPage />}
        />

        <Route path="/cart" element={<CartPage />} />

      </Routes>

    </div>
  );
}

export default App;