import React, {useState} from "react";
import {db} from "../utils/firebase-config";
import "../css/Home.css";
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
    console.log("Update Succesful! Bid ID: " + props.selectedBid.id);
    const bidDoc = doc(db, "bids", props.selectedBid.id);
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

  if (!props.selectedBid) {
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
          <form>
            <input
              type="text"
              required="required"
              value={props.selectedBid.jobName}
              placeholder={`Job Name: ${props.selectedBid.jobName}`}
              name="jobName"
              onChange={(event) => {
                setNewJobName(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedBid.generalContractor}
              placeholder={`General Contractor: ${props.selectedBid.jobName}`}
              name="generalConstractor"
              onChange={(event) => {
                setNewGC(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedBid.city}
              placeholder={`City: ${props.selectedBid.jobName}`}
              name="city"
              onChange={(event) => {
                setNewCity(event.target.value);
              }}
            />
            <p>Date Posted:</p>
            <input
              type="date"
              required="required"
              value={props.selectedBid.date}
              name="date"
              onChange={(event) => {
                setNewDate(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedBid.projectType}
              placeholder={`Project Type: ${props.selectedBid.jobName}`}
              name="projectType"
              onChange={(event) => {
                setNewProjectType(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedBid.wageType}
              placeholder={`Wage Type: ${props.selectedBid.jobName}`}
              name="wageType"
              onChange={(event) => {
                setNewWageType(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedBid.constructType}
              placeholder={`Construction Type: ${props.selectedBid.jobName}`}
              name="constructType"
              onChange={(event) => {
                setNewConstructType(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedBid.floorSystem}
              placeholder={`Floor System: ${props.selectedBid.jobName}`}
              name="floorSystem"
              onChange={(event) => {
                setNewFloorSystem(event.target.value);
              }}
            />
            <input
              type="text"
              required="required"
              value={props.selectedBid.roofSystem}
              placeholder={`Roof System: ${props.selectedBid.jobName}`}
              name="roofSystem"
              onChange={(event) => {
                setNewRoofSystem(event.target.value);
              }}
            />
            <p>Due Date:</p>
            <input
              type="date"
              required="required"
              value={props.selectedBid.dueDate}
              name="dueDate"
              onChange={(event) => {
                setNewDueDate(event.target.value);
              }}
            />
            <p>Sent Date:</p>
            <input
              type="date"
              required="required"
              value={props.selectedBid.dateSent}
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
