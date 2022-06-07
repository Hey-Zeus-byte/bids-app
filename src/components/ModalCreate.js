import {useState} from "react";
import "../css/Bids.css";
import {db} from "../utils/firebase-config";
import {collection, addDoc} from "firebase/firestore";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ModalCreate(props) {
  const [sent, setSent] = useState(false);
  const [bidding, setBidding] = useState(false);

  const [newDate, setNewDate] = useState("");
  const [newGC, setNewGC] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newProjectType, setNewProjectType] = useState("");
  const [newConstructType, setNewConstructType] = useState("");
  const [newDateSent, setNewDateSent] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newWageType, setNewWageType] = useState("");
  const [newFloorSystem, setNewFloorSystem] = useState("");
  const [newRoofSystem, setNewRoofSystem] = useState("");

  const bidsCollectionRef = collection(db, "bids");

  const createBid = async () => {
    // console.log("Bid Created Succesful!");
    await addDoc(bidsCollectionRef, {
      sent: sent,
      bidding: bidding,
      jobName: newJobName,
      generalContractor: newGC,
      city: newCity,
      date: newDate,
      projectType: newProjectType,
      wageType: newWageType,
      constructType: newConstructType,
      floorSystem: newFloorSystem,
      roofSystem: newRoofSystem,
      dueDate: newDueDate,
      dateSent: newDateSent,
    }).catch((err) => {
      alert(err);
      console.error(err);
    });
  };

  if (!props.showCreate) {
    return null;
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="" placeholder="" />
        <Form.Text className="">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>Password</Form.Label>
        <Form.Control type="" placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="">
        <Form.Check type="" label="" />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={createBid}
        className="button"
      >
        Create
      </Button>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Enter Bid Information:</h4>
          </div>
          <div className="modal-body">
            <form>
              <Form.Control
                type="boolean"
                onChange={() => {
                  setSent(false);
                }}
                hidden={true}
              />
              <Form.Control
                type="boolean"
                onChange={() => {
                  setBidding(false);
                }}
                hidden={true}
              />
              <Form.Control
                type="string"
                required="required"
                placeholder="Job Name..."
                onChange={(event) => {
                  setNewJobName(event.target.value);
                }}
              />
              <Form.Control
                type="string"
                required="required"
                placeholder="General Contractor..."
                onChange={(event) => {
                  setNewGC(event.target.value);
                }}
              />
              <Form.Control
                type="string"
                required="required"
                placeholder="City..."
                onChange={(event) => {
                  setNewCity(event.target.value);
                }}
              />
              <p>Date Posted:</p>
              <Form.Control
                type="date"
                required="required"
                onChange={(event) => {
                  setNewDate(event.target.value);
                }}
              />
              <Form.Control
                type="text"
                required="required"
                placeholder="Project Type..."
                onChange={(event) => {
                  setNewProjectType(event.target.value);
                }}
              />
              <Form.Control
                type="string"
                required="required"
                placeholder="Type of Wage..."
                onChange={(event) => {
                  setNewWageType(event.target.value);
                }}
              />
              <Form.Control
                type="string"
                required="required"
                placeholder="Construction Type..."
                onChange={(event) => {
                  setNewConstructType(event.target.value);
                }}
              />
              <Form.Control
                type="string"
                required="required"
                placeholder="Floor System..."
                onChange={(event) => {
                  setNewFloorSystem(event.target.value);
                }}
              />
              <Form.Control
                type="string"
                required="required"
                placeholder="Roof System..."
                onChange={(event) => {
                  setNewRoofSystem(event.target.value);
                }}
              />
              <p>Due Date:</p>
              <Form.Control
                type="date"
                required="required"
                placeholder="Due Date..."
                onChange={(event) => {
                  setNewDueDate(event.target.value);
                }}
              />
              <p>Sent Date:</p>
              <Form.Control
                type="date"
                required="required"
                placeholder="Sent Date..."
                onChange={(event) => {
                  setNewDateSent(event.target.value);
                }}
              />
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button">
              Close
            </button>
            <button onClick={createBid} className="button">
              Create
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ModalCreate;
