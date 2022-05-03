import React, {useState} from "react";
import {Card, Button, Alert} from "react-bootstrap";
import {useAuth} from "../utils/AuthContext";
import {Link, useNavigate} from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body style={{fontSize: "25px"}}>
          <h2>Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update_profile">Update Profile</Link>
        </Card.Body>
      </Card>
      <div>
        <Button
          variant="link"
          onClick={handleLogout}
          style={{fontSize: "25px"}}
        >
          Log Out
        </Button>
        <Button
          onClick={() => {
            navigate("/bids_list");
          }}
          style={{fontSize: "25px"}}
        >
          Back
        </Button>
      </div>
    </>
  );
}
