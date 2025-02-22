import React from "react";
import ProductCard from "../components/ProductCard";
import ProductList from "./ProductList";
import CoffeeCarousel from "../components/CoffeeCarousel";

const Home = () => {
  return (
    <div className="container alert alert-info m-5">
      {/* <ProductCard /> */}

      <ProductList />

      {/* <h1>home page</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta velit
        minima nemo expedita optio similique voluptatibus, iste dignissimos
        nobis laudantium consequuntur deleniti incidunt repellat ab vel, nisi
        ipsa sit et?
      </p>
      <button className="btn btn-dark">show more</button> */}
    </div>
  );
};

export default Home;
