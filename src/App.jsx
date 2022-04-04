<<<<<<< HEAD
import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const App = () => {
  const [bids, setBids] = useState(data);
  const [addFormData, setAddFormData] = useState({
    date: "",
    generalContractor: "",
    jobName: "",
    dueDate: "",
  });

  const [editFormData, setEditFormData] = useState({ // this is in EditableRow.jsx
    date: "",
    generalContractor: "",
    jobName: "",
    dueDate: "",
  });

  const [editBidId, setEditBidId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => { // this is in EditableRow.jsx
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newBid = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newBids = [...bids, newBid];
    setBids(newBids);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedBid = {
      id: editBidId,
      date: editFormData.date,
      generalContractor: editFormData.generalContractor,
      jobName: editFormData.jobName,
      dueDate: editFormData.dueDate,
    };

    const newBids = [...bids];

    const index = bids.findIndex((bid) => bid.id === editBidId);

    newBids[index] = editedBid;

    setBids(newBids);
    setEditBidId(null);
  };

  const handleEditClick = (event, bid) => {
    event.preventDefault();
    setEditBidId(bid.id);

    const formValues = {
      date: bid.date,
      generalContractor: bid.generalContractor,
      jobName: bid.jobName,
      dueDate: bid.dueDate,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => { // this is in EditableRow.jsx
    setEditBidId(null);
  };

  const handleDeleteClick = (bidId) => {
    const newBids = [...bids];

    const index = bids.findIndex((bid) => bid.id === bidId);

    newBids.splice(index, 1);

    setBids(newBids);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>GC</th>
              <th>Job Name</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <Fragment key={bid.id}>
                {editBidId === bid.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    bid={bid}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Bid</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="date"
          required="required"
          placeholder="Post Date..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="generalContrator"
          required="required"
          placeholder="General Contractor..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="jobName"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="dueDate"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
=======
import {useState, useEffect} from "react";
import moment from "moment";
import "./App.css";
import {db} from "./firebase-config";
import {collection, getDocs, deleteDoc, addDoc, doc} from "firebase/firestore";
import ModalUpdate from "./ModalUpdate";
import Checkbox from "./CheckBox";

function App() {
  const [bids, setBids] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newGC, setNewGC] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newProjectType, setNewProjectType] = useState("");
  const [newConstructType, setNewConstructType] = useState("");
  const [newDateSent, setNewDateSent] = useState("");

  const bidsCollectionRef = collection(db, "bids");

  const [show, setShow] = useState(false);

  const state = {checked: false};

  const handleCheckboxChange = (event) => {
    this.setState({checked: event.target.checked});
  };

  const createBid = async () => {
    await addDoc(bidsCollectionRef, {
      date: newDate,
      generalContractor: newGC,
      jobName: newJobName,
      dueDate: newDueDate,
      projectType: newProjectType,
      constructType: newConstructType,
      dateSent: newDateSent,
    });
  };

  const deleteBid = async (id) => {
    const bidDoc = doc(db, "bids", id);
    await deleteDoc(bidDoc);
  };

  useEffect(() => {
    const getBids = async () => {
      const data = await getDocs(bidsCollectionRef);
      const items = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setBids(items);
    };

    getBids();
  }, [bidsCollectionRef]);

  return (
    <div className="app-container">
      <h1>GSCF Bids List</h1>
      <table>
        <thead>
          <tr>
            <th>Check</th>
            <th>Date Posted</th>
            <th>General Contractor</th>
            <th>Job Name</th>
            <th>Due Date</th>
            <th>Project Type</th>
            <th>Construction Type</th>
            <th>Date Sent</th>
          </tr>
        </thead>
        {bids.map((bid) => {
          return (
            <tbody key={bid.id}>
              <tr>
                <label>
                  <Checkbox
                    checked={state.checked}
                    onChange={handleCheckboxChange}
                  />
                  <span style={{marginLeft: 8}}>Sent</span>
                </label>
                {/* Check box can not render due to Quote being reached. check next time! */}
                <td>{moment(bid.date).calendar()}</td>
                <td>{bid.generalContractor}</td>
                <td>{bid.jobName}</td>
                <td>{moment(bid.dueDate).calendar()}</td>
                <td>{bid.projectType}</td>
                <td>{bid.constructType}</td>
                <td>{moment(bid.dateSent).calendar()}</td>
              </tr>
              <button
                onClick={() => {
                  setShow(true);
                }}
              >
                Update Bid
              </button>
              <ModalUpdate onClose={() => setShow(false)} show={show} />
              <button
                onClick={() => {
                  deleteBid(bid.id);
                }}
              >
                Delete Bid
              </button>
            </tbody>
          );
        })}
      </table>
      <form>
        <input
          type="date"
          placeholder="Post Date..."
          onChange={(event) => {
            setNewDate(event.target.value);
          }}
        />
        <input
          type="string"
          placeholder="General Contractor..."
          onChange={(event) => {
            setNewGC(event.target.value);
          }}
        />
        <input
          type="string"
          placeholder="Job Name..."
          onChange={(event) => {
            setNewJobName(event.target.value);
          }}
        />
        <input
          type="date"
          placeholder="Due Date..."
          onChange={(event) => {
            setNewDueDate(event.target.value);
          }}
        />
        <input
          type="string"
          placeholder="Project Type..."
          onChange={(event) => {
            setNewProjectType(event.target.value);
          }}
        />
        <input
          type="string"
          placeholder="Construction Type..."
          onChange={(event) => {
            setNewConstructType(event.target.value);
          }}
        />
        <input
          type="date"
          placeholder="Sent Date..."
          onChange={(event) => {
            setNewDateSent(event.target.value);
          }}
        />
        <button onClick={createBid}>Create Bid</button>
      </form>

      <h4 id="bottom">Created By: Jesus Valdez</h4>
    </div>
  );
}

export default App;
>>>>>>> 1ed061647d70da753ed891d3b4061b97b488cc8a
