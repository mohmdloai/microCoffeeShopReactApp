import React, { useState, useContext } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      Swal.fire("Error", "Your cart is empty!", "error");
      return;
    }

    const newOrder = {
      customerName: formData.name,
      address: formData.address,
      cardNumber: formData.cardNumber,
      items: cartItems, // ✅ إضافة المنتجات للسلة
      totalPrice: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      date: new Date().toLocaleString(),
    };

    try {
      //sending data to json server
      const response = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) throw new Error("Failed to place order");

      // dleting
      setCartItems([]);
      localStorage.removeItem("cartItems");
      toast.success("Order placed successfully!");
      Swal.fire(
        "Success!",
        "Your order has been placed successfully!",
        "success"
      ).then(() => {
        navigate("/");
        toast.success("Your cart has been cleant up Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      });
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire("Error", "Failed to place order. Try again!", "error");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Checkout</h2>
      {/* showing the products in the cart */}
      {cartItems.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
