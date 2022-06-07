import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import {useAuth} from "../utils/AuthContext";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/bids_list");
    } catch {
      setError("Failed to log in");
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
          <h2 style={{fontSize: "25px", textAlign: "center"}}>Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required size="lg" />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                autoComplete="on"
                required
                size="lg"
              />
            </Form.Group>
            <Button disabled={loading} type="submit" size="lg" active>
              Log In
            </Button>
          </Form>
          <Form.Text style={{fontSize: "20px"}}>
            <Link to="/forgot_password">Forgot Password?</Link>
          </Form.Text>
        </Card.Body>
      </Card>
      <Form.Text style={{fontSize: "20px"}}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </Form.Text>
    </>
  );
}
