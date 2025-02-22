import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col className="text-center">
            <h1 className="display-1">404</h1>
            <p className="lead">
              Oops! The page you're looking for doesn't exist.
            </p>
            <Button variant="primary" onClick={handleGoHome}>
              Go Back Home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFound;
