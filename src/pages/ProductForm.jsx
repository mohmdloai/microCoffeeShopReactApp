import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { addNewProduct, editProduct, getProductById } from "../api/product";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productFormData, setProductFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (id != 0) {
      getProductById(id)
        .then((res) => {
          setProductFormData(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [id]);

  const inputFillingHandler = (e) => {
    setProductFormData({
      ...productFormData,
      [e.target.name]: e.target.value,
    });
  };

  const productHandler = async (e) => {
    e.preventDefault();

    if (id == 0) {
      await addNewProduct(productFormData);
      navigate("/products");
    } else {
      await editProduct(id, productFormData);
      navigate("/products");
    }
  };
  return (
    <Container className="mt-5 justify-content-center align-items-center">
      <h2 className="mb-4 text-muted text-center mt-5">
        {id == 0 ? "Add New Product" : "Edit Product"}
      </h2>
      <Form onSubmit={productHandler} className="w-50">
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Prodcut Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="prod name"
            name="name"
            value={productFormData.name}
            onChange={inputFillingHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="porductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="prodcutPrice"
            name="price"
            value={productFormData.price}
            onChange={inputFillingHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="porductQuantity">
          <Form.Label>quantity</Form.Label>
          <Form.Control
            type="text"
            placeholder="prodcut quantity"
            name="quantity"
            value={productFormData.quantity}
            onChange={inputFillingHandler}
          />
        </Form.Group>
        <Button variant="info" type="submit">
          {id == 0 ? "Add New Product" : "Edit Product"}
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
