import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState("customer"); // Default role: customer
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newUser = { name, email, password, role };

    const response = await fetch("http://localhost:5001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      // alert("Registration successful! You can now log in.");
      toast.success("Registration successful! You can now log in.");
      navigate("/login");
      setIsLoading(false);
    } else {
      // alert("Registration failed! Please try again.");
      toast.error("Registration failed! Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Register</h3>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
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

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default Register;
