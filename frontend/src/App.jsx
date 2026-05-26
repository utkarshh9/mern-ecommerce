import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";

import ProductDetailsPage from "./pages/ProductDetailsPage";


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

      </Routes>

    </div>
  );
}

export default App;