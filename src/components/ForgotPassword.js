import { useState, useRef } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("check your inbox to get a new password");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3 "
              disabled={loading}>
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 ">
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account ?
        <Link to="/signup" className="text-decoration-none">
          {` Signup`}
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
