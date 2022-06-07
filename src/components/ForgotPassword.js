import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "../utils/AuthContext";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const {resetPassword} = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h1 style={{fontSize: "50px", textAlign: "center"}}>
            {`Golden State Construction & Framing, Inc.`}
          </h1>
          <h2 style={{fontSize: "25px", textAlign: "center"}}>
            Password Reset
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Button disabled={loading} type="submit" size="lg" active>
              Reset Password
            </Button>
          </Form>
          <Form.Text style={{fontSize: "20px"}}>
            Back to <Link to="/">Login</Link>
          </Form.Text>
        </Card.Body>
      </Card>
      <Form.Text style={{fontSize: "20px"}}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </Form.Text>
    </>
  );
}
