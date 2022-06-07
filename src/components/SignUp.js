import React, {useRef, useState} from "react";
import {Card, Form, Button, Alert} from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom";
import {useAuth} from "../utils/AuthContext";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {signup} = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        (response) => {
          console.log(response);
        }
      );
      navigate("/");
    } catch {
      setError("Couldn't make account!");
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
          <h2 style={{fontSize: "25px", textAlign: "center"}}>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* // if we have an error */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                autoComplete="on"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} type="submit" size="lg" active>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Form.Text style={{fontSize: "20px"}}>
        Already have an account? <Link to="/">Log In</Link>
      </Form.Text>
    </>
  );
}
