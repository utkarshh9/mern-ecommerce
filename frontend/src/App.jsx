import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";

import ProductDetailsPage from "./pages/ProductDetailsPage";

import CartPage from "./pages/CartPage";

import LoginPage from "./pages/LoginPage";

import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminRoute from "./routes/AdminRoute";

import AdminDashboard from "./pages/AdminDashboard";

import AdminProductsPage from "./pages/AdminProductsPage";

import AdminCreateProductPage from "./pages/AdminCreateProductPage";

import AdminEditProductPage from "./pages/AdminEditProductPage";


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

        <Route
          path="/cart"
          element={
            <ProtectedRoute>

              <CartPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>

              <AdminDashboard />

            </AdminRoute>
          }
        />


        <Route
          path="/admin/products"
          element={
            <AdminRoute>

              <AdminProductsPage />

            </AdminRoute>
          }
        />


        <Route
          path="/admin/products/create"
          element={
            <AdminRoute>

              <AdminCreateProductPage />

            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/:id/edit"
          element={
            <AdminRoute>

              <AdminEditProductPage />

            </AdminRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;