import React, {useState} from "react";
import {db} from "./firebase-config";
import {updateDoc, doc} from "firebase/firestore";

const ModalUpdate = (props, bid) => {
  const [newDate, setNewDate] = useState("");
  const [newGC, setNewGC] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newProjectType, setNewProjectType] = useState("");
  const [newConstructType, setNewConstructType] = useState("");
  const [newDateSent, setNewDateSent] = useState("");

  const updateBid = async (event) => {
    event.preventDefault();
    const bidDoc = doc(db, "bids", bid.id);
    console.log(bid.id, "=>", bid.data());
    await updateDoc(bidDoc, {
      date: newDate,
      generalContractor: newGC,
      jobName: newJobName,
      dueDate: newDueDate,
      projectType: newProjectType,
      constructType: newConstructType,
      dateSent: newDateSent,
    }).catch((err) => {
      alert(err);
      console.error(err);
    });
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Update Modal</h4>
        </div>
        <div className="modal-body">
          <form>
            <input
              type="date"
              required="required"
              onChange={(event) => {
                setNewDate(event.target.value);
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
              placeholder="Job Name..."
              onChange={(event) => {
                setNewJobName(event.target.value);
              }}
            />
            <input
              type="date"
              required="required"
              placeholder="Due Date..."
              onChange={(event) => {
                setNewDueDate(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              placeholder="Project Type..."
              onChange={(event) => {
                setNewProjectType(event.target.value);
              }}
            />
            <input
              type="string"
              required="required"
              placeholder="Construction Type..."
              onChange={(event) => {
                setNewConstructType(event.target.value);
              }}
            />
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
          <button onClick={updateBid} className="button">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
