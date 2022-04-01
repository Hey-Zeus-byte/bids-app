import React, {useState} from "react";
import {db} from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Modal = (props) => {
  const bidsCollectionRef = collection(db, "bids");

  const [newDate, setNewDate] = useState("");
  const [newGC, setNewGC] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const updateBid = async () => {
    const findBids = await updateDoc(bidsCollectionRef);
    findBids.forEach(async (bid) => {
      const getBid = doc(db, "bids", bid.id);
      await updateDoc(getBid, {
        date: newDate,
        generalContractor: newGC,
        jobName: newJobName,
        dueDate: newDueDate,
        // projectType: newProjectType,
        // constructType: newConstructType,
        // dateSent: newDateSent,
        // newDone: setNewDone,
      });
    });
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Modal Title</h4>
        </div>
        <div className="modal-body">
          {" "}
          <form>
            <input
              type="date"
              required="required"
              placeholder="Post Date..."
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

export default Modal;
