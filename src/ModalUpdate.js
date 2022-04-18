import React, {useState} from "react";
import {db} from "./firebase-config";
import "./Home.css";
import {updateDoc, doc} from "firebase/firestore";

const ModalUpdate = (props) => {
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
  // const [newDaysLeft, setNewDaysLeft] = useState("");

  const updateBid = async (e) => {
    e.preventDefault();
    console.log("Update Succesful! Bid ID: " + props.selectedId);
    const bidDoc = doc(db, "bids", props.selectedId);
    await updateDoc(bidDoc, {
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
      // daysLeft: newDaysLeft,
      dateSent: newDateSent,
    }).catch((err) => {
      alert(err);
      console.error(err);
    });
  };

  if (!props.selectedId) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">
            Update Bid Information: No need to fill all entries!
          </h4>
        </div>
        <div className="modal-body">
          <form key={props.selectedId}>
            <input
              type="text"
              required="required"
              value={props.selectedId.jobName}
              placeholder={`Job Name: ${props.selectedId.jobName}`}
              name="jobName"
              onChange={(event) => {
                setNewJobName(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedId.generalContractor}
              placeholder={`General Contractor: ${props.selectedId.jobName}`}
              name="generalConstractor"
              onChange={(event) => {
                setNewGC(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedId.city}
              placeholder={`City: ${props.selectedId.jobName}`}
              name="city"
              onChange={(event) => {
                setNewCity(event.target.value);
              }}
            />
            <p>Date Posted:</p>
            <input
              type="date"
              required="required"
              value={props.selectedId.date}
              name="date"
              onChange={(event) => {
                setNewDate(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedId.projectType}
              placeholder={`Project Type: ${props.selectedId.jobName}`}
              name="projectType"
              onChange={(event) => {
                setNewProjectType(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedId.wageType}
              placeholder={`Wage Type: ${props.selectedId.jobName}`}
              name="wageType"
              onChange={(event) => {
                setNewWageType(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedId.constructType}
              placeholder={`Construction Type: ${props.selectedId.jobName}`}
              name="constructType"
              onChange={(event) => {
                setNewConstructType(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedId.floorSystem}
              placeholder={`Floor System: ${props.selectedId.jobName}`}
              name="floorSystem"
              onChange={(event) => {
                setNewFloorSystem(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedId.roofSystem}
              placeholder={`Roof System: ${props.selectedId.jobName}`}
              name="roofSystem"
              onChange={(event) => {
                setNewRoofSystem(event.target.value);
              }}
            />
            <p>Due Date:</p>
            <input
              type="date"
              required="required"
              value={props.selectedId.dueDate}
              name="dueDate"
              onChange={(event) => {
                setNewDueDate(event.target.value);
              }}
            />
            <p>Sent Date:</p>
            <input
              type="date"
              required="required"
              value={props.selectedId.dateSent}
              name="dateSent"
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
          <button onClick={updateBid} className="button">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
