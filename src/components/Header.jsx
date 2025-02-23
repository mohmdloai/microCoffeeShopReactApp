import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { getLoggedInUser, logout } from "../guard/auth";

const Header = () => {
  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    zIndex: 1000,
  };
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  // const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const loggedInUser = getLoggedInUser();
  console.log(loggedInUser);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar
      style={headerStyle}
      bg="dark"
      variant="dark"
      expand="lg"
      className="py-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          microShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="fw-semibold text-light">
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className="fw-semibold text-light"
            >
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" className="fw-semibold text-light">
              Menu
            </Nav.Link>

            {loggedInUser ? (
              <div className="d-flex align-items-center gap-3">
                {/* اسم اليوزر جوه دايرة */}
                <Badge
                  pill
                  bg="warning"
                  text="dark"
                  className="p-2 px-3 fw-bold"
                  style={{ borderRadius: "50px", fontSize: "14px" }}
                >
                  {loggedInUser.role === "admin" ? "Admin" : loggedInUser.name}
                </Badge>

                {/* زر تسجيل الخروج */}
                <Button variant="danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="fw-semibold text-light"
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="fw-semibold text-light"
                >
                  Login
                </Nav.Link>
              </>
            )}

            {/* أيقونة السلة */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart size={24} color="white" />
              {cartItems.length > 0 && (
                <Badge
                  bg="warning"
                  text="dark"
                  className="position-absolute top-0 start-100 translate-middle p-2 rounded-circle"
                  style={{ fontSize: "12px" }}
                >
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
