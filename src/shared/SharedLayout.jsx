import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";
import { CartProvider } from "../context/CartContext";
import CoffeeCarousel from "../components/CoffeeCarousel";

const SharedLayout = () => {
  return (
    <CartProvider>
      <Header />
      <CoffeeCarousel />
      <Outlet />
      <Footer />
    </CartProvider>
  );
};

export default SharedLayout;
