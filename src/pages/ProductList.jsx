import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import { getAllProducts } from "../api/product.js";
import { CartContext } from "../context/CartContext"; // استيراد الـ Context

const ProductCard = ({ product, onAddToCart }) => (
  <Card style={{ width: "18rem" }} className="mb-3">
    <Card.Img variant="top" src={product.image} alt={product.name} />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      <Card.Text>{product.description}</Card.Text>
      <Card.Text>
        <strong>Price: ${product.price}</strong>
      </Card.Text>
      <Button
        className="mx-2 w-100 bg-warning"
        variant="success"
        onClick={() => onAddToCart(product)}
      >
        <FaShoppingCart /> Add to Cart
      </Button>
    </Card.Body>
  </Card>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // استدعاء دالة إضافة للسلة

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
            <ProductCard product={product} onAddToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
