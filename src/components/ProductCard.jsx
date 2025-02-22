import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { getAllProducts } from "../api/product.js";

const ProductCard = ({ product }) => (
  <Card style={{ width: "18rem" }} className="mb-3">
    <Card.Img variant="top" src={product.image} alt={product.name} />
    <Card.Body>
      <Card.Title>{product?.name}</Card.Title>
      {/* <Card.Text>{product?.description}</Card.Text> */}
      <div className="d-flex justify-content-between">
        <Button variant="primary">Product Details</Button>
        <Button variant="success">
          <FaShoppingCart className="w-25" /> Add to Cart
        </Button>
      </div>
    </Card.Body>
  </Card>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
