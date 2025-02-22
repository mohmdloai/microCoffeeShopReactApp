import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/users");
    const users = await response.json();

    // Find the user with matching email and password
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store the logged-in user in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");

      // Redirect the user based on their role
      redirectLoggedInUser(user);
    } else {
      alert("Invalid email or password. Try again!");
    }
  };

  // Function to redirect the user based on their role
  const redirectLoggedInUser = (user) => {
    if (!user) {
      return;
    }
    if (user.role === "admin") {
      navigate("/products");
    } else if (user.role === "customer") {
      navigate("/");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
