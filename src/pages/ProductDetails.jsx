import React from "react";
import { FaStar } from "react-icons/fa";
import prodcutImg from "../assets/images/Caramel Iced Coffee.png";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../api/product";
import { useEffect } from "react";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className="bg-dark mt-5 rounded p-5 container text-light">
      <div className="row">
        <div className="col-sm-6">
          <img
            className="w-75 rounded"
            src={prodcutImg}
            alt="cappuccino image"
          />
        </div>

        <div className="col-sm-6">
          <h1 className="text-warning mt-3">this the details page</h1>
          <p className="lead fs-4">product Name: {product?.name}</p>
          <p className="lead fs-4">product price: {product?.price}$</p>
          <p className="lead fs-4">product Quantity: {product?.quantity}</p>
          <div>
            <FaStar className="text-warning fs-1 mx-1" />
            <FaStar className="text-warning fs-1 mx-1" />
            <FaStar className="text-warning fs-1 mx-1" />
            <FaStar className="text-warning fs-1 mx-1" />
            <FaStar className="text-warning fs-1 mx-1" />
          </div>
          <Link to={`/products`} className="btn btn-info mt-3">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
