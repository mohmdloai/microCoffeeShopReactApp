import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "../shared/SharedLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductForm from "../pages/ProductForm";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";
import RegistrationForm from "../pages/RegistrationForm";
import CartPage from "../pages/CartPage";
import Swal from "sweetalert2";
import { CartProvider } from "../context/CartContext"; //new
import CheckoutPage from "../pages/CheckoutPage"; //new
import Login from "../pages/Login"; //new
import CoffeeCarousel from "../components/CoffeeCarousel";

const MainLayout = () => {
  const [cart, setCart] = useState([]);

  const handleUpdateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleOrderNow = () => {
    Swal.fire({
      title: "Success!",
      text: "Your order has been shipped to you!",
      icon: "success",
      confirmButtonText: "OK",
    });
    setCart([]);
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="register" element={<RegistrationForm />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default MainLayout;
