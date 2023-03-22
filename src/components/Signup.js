import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Signup = () => {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control type="password" id="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password-confirmation">
                Password Confirmation
              </Form.Label>
              <Form.Control
                type="password"
                id="password-confirmation"
                ref={passwordConfirmationRef}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3 "
              disabled={loading}>
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account ?
        <Link to="/login" className="text-decoration-none">
          {` Login`}
        </Link>
      </div>
    </>
  );
};

export default Signup;
