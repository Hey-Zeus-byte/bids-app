import {useState} from "react";
import "./App.css";
import {db} from "./firebase-config";
import {collection, addDoc} from "firebase/firestore";

function ModalCreate(props) {
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
  const [newDaysLeft, setNewDaysLeft] = useState("");

  const bidsCollectionRef = collection(db, "bids");

  const dateDiff = () => {
    let myCurrentDate = new Date();
    let refDate = myCurrentDate.getDate();
    let difference = refDate - newDueDate;
    setNewDaysLeft(difference);
  };

  const createBid = async () => {
    await addDoc(bidsCollectionRef, {
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
    });
  };

  if (!props.showCreate) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Enter Bid Information:</h4>
        </div>
        <div className="modal-body">
          <form>
            <input
              type="string"
              required="required"
              placeholder="Job Name..."
              onChange={(event) => {
                setNewJobName(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              placeholder="General Contractor..."
              onChange={(event) => {
                setNewGC(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              placeholder="City..."
              onChange={(event) => {
                setNewCity(event.target.value);
              }}
            />
            <p>Date Posted</p>
            <input
              type="date"
              required="required"
              onChange={(event) => {
                setNewDate(event.target.value);
              }}
            ></input>
            <input
              type="text"
              required="required"
              placeholder="Project Type..."
              onChange={(event) => {
                setNewProjectType(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              placeholder="Type of Wage..."
              onChange={(event) => {
                setNewWageType(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              placeholder="Construction Type..."
              onChange={(event) => {
                setNewConstructType(event.target.value);
              }}
            />{" "}
            <input
              type="string"
              required="required"
              placeholder="Floor System..."
              onChange={(event) => {
                setNewFloorSystem(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              placeholder="Roof System..."
              onChange={(event) => {
                setNewRoofSystem(event.target.value);
              }}
            />
            <p>Due Date</p>
            <input
              type="date"
              required="required"
              placeholder="Due Date..."
              onChange={(event) => {
                setNewDueDate(event.target.value);
              }}
            />
            <p>Sent Date</p>
            <input
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
  );
}

export default ModalCreate;
