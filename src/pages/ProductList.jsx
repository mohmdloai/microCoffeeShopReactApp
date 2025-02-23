import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import { getAllProducts } from "../api/product.js";
import { CartContext } from "../context/CartContext";
import { MoonLoader } from "react-spinners";

const ProductCard = ({ product, onAddToCart }) => (
  <Card style={{ width: "18rem" }} className="mb-3">
    <Card.Img
      style={{ height: "15rem" }}
      variant="top"
      src={product.image}
      alt={product.name}
    />
    <Card.Body>
      <Card.Title>{product.name}</Card.Title>
      {/* <Card.Text>{product.description}</Card.Text> */}
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then((response) => {
        setIsLoading(false);
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filterProducts = (filter) => {
    if (filter === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  };

  return isLoading ? (
    <MoonLoader
      color="red"
      cssOverride={{ display: "block", margin: "0 auto" }}
      loading
      size={130}
      speedMultiplier={2}
    />
  ) : (
    <Container className="mt-3">
      <div className="d-flex justify-content-center mb-4">
        <Button
          style={{ background: "linear-gradient(to right, #8B4513, #A0522D)" }}
          className="text-white mx-2"
          onClick={() => filterProducts("french")}
        >
          French Coffee
        </Button>
        <Button
          style={{ background: "linear-gradient(to right, #6A5ACD, #4682B4)" }}
          className="text-white mx-2"
          onClick={() => filterProducts("iced")}
        >
          Iced Coffee
        </Button>
        <Button
          style={{ background: "linear-gradient(to right, #D2691E, #FFDEAD)" }}
          className="text-white mx-2"
          onClick={() => filterProducts("latte")}
        >
          Latte
        </Button>
        <Button
          style={{ background: "linear-gradient(to right, #2E8B57, #66CDAA)" }}
          className="text-white mx-2"
          onClick={() => filterProducts("All")}
        >
          All
        </Button>
      </div>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
