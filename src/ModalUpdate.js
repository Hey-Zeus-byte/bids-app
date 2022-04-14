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

  const updateBid = async () => {
    console.log(props.selectedId);
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
          <form>
            <input
              type="string"
              required="required"
              defaultValue={props.selectedId.newJobName}
              placeholder={props.selectedId.newJobName}
              onChange={(event) => {
                setNewJobName(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              defaultValue={props.selectedId.generalContractor}
              placeholder={props.selectedId.generalContractor}
              onChange={(event) => {
                setNewGC(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              defaultValue={props.selectedId.city}
              placeholder={props.selectedId.city}
              onChange={(event) => {
                setNewCity(event.target.value);
              }}
            />
            <p>Date Posted:</p>
            <input
              type="date"
              required="required"
              defaultValue={props.selectedId.date}
              placeholder={props.selectedId.date}
              onChange={(event) => {
                setNewDate(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              defaultValue={props.selectedId.projectType}
              placeholder={props.selectedId.projectType}
              onChange={(event) => {
                setNewProjectType(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              defaultValue={props.selectedId.wageType}
              placeholder={props.selectedId.wageType}
              onChange={(event) => {
                setNewWageType(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              defaultValue={props.selectedId.constructType}
              placeholder={props.selectedId.constructType}
              onChange={(event) => {
                setNewConstructType(event.target.value);
              }}
            />{" "}
            <input
              type="string"
              required="required"
              defaultValue={props.selectedId.floorSystem}
              placeholder={props.selectedId.floorSystem}
              onChange={(event) => {
                setNewFloorSystem(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              defaultValue={props.selectedId.roofSystem}
              placeholder={props.selectedId.roofSystem}
              onChange={(event) => {
                setNewRoofSystem(event.target.value);
              }}
            />
            <p>Due Date:</p>
            <input
              type="date"
              required="required"
              defaultValue={props.selectedId.dueDate}
              placeholder={props.selectedId.dueDate}
              onChange={(event) => {
                setNewDueDate(event.target.value);
              }}
            />
            <p>Sent Date:</p>
            <input
              type="date"
              required="required"
              defaultValue={props.selectedId.dateSent}
              placeholder={props.selectedId.dateSent}
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