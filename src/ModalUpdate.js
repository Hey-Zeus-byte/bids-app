import React, {useState} from "react";
import {db} from "./firebase-config";
import {collection, updateDoc, doc, getDocs, setDoc} from "firebase/firestore";

const ModalUpdate = (props) => {
  const bidsCollectionRef = collection(db, "bids");

  const [newDate, setNewDate] = useState("");
  const [newGC, setNewGC] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newProjectType, setNewProjectType] = useState("");
  const [newConstructType, setNewConstructType] = useState("");
  const [newDateSent, setNewDateSent] = useState("");

  // function editBid(updated) {
  //   bidsCollectionRef
  //     .doc(updated.id)
  //     .update(updated)
  // .catch((err) => {
  //   alert(err);
  //   console.error(err);
  // });
  // }

  const updateBid = async () => {
    const findBids = await getDocs(bidsCollectionRef);
    findBids.forEach((bid) => {
      // add "async" before (bid) if needed.
      console.log(bid.id, "=>", bid.data());
      const getBid = doc(db, "bids", bid.id);
      updateDoc(getBid, {
        // "await" was removed before the updateDoc function.
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
      setDoc(doc.bidsCollectionRef, getBid); // Remove if not needed.
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
