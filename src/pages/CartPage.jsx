import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
import { guard } from "../guard/auth";

const CartPage = () => {
  useEffect(() => {
    guard("customer"); // Only allow users with the "customer" role
  }, []);

  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <Container className="mt-4">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={`${item.id}-${index}`}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Link to="/checkout">
            <Button variant="success">Checkout</Button>
          </Link>
        </>
      )}
    </Container>
  );
};

export default CartPage;
