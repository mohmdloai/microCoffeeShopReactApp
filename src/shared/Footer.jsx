import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-light text-center">
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <h5 className="footer-title">✨ Pretty Products ✨</h5>
            <p className="text-muted">Discover the beauty in every product!</p>
          </Col>

          <Col md={4} className="text-center">
            <h6 className="text-primary">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/products" className="text-decoration-none text-pink">
                  🛍️ Products
                </a>
              </li>
              <li>
                <a href="/about" className="text-decoration-none text-pink">
                  💖 About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-decoration-none text-pink">
                  📩 Contact
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="text-center">
            <h6 className="text-success">Follow Us</h6>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-decoration-none text-purple fs-4">
                🌸
              </a>
              <a href="#" className="text-decoration-none text-purple fs-4">
                💜
              </a>
              <a href="#" className="text-decoration-none text-purple fs-4">
                🌷
              </a>
            </div>
          </Col>
        </Row>
        <hr className="my-3 border-pink" />
        <p className="text-muted small">
          © 2025 Pretty Products. Made with 💕 by Akamush.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
