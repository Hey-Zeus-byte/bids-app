import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";

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
