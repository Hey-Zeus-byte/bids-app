import React from "react";
import {db} from "../utils/firebase-config";
import {deleteDoc, doc} from "firebase/firestore";

const DeleteBid = (props) => {
  const deleteBid = async (id) => {
    console.log("Deleted Bid ID: " + id);
    const bidDoc = doc(db, "bids", id);
    await deleteDoc(bidDoc);
    console.log("Deleted post data from id: " + id);
  };

  if (!props.openDeleteBid) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">
            Are you sure you want to delete this bid? If Yes, exit the modal
            after.
          </h1>
        </div>
        <div className="modal-footer">
          <button
            className="button"
            onClick={() => {
              deleteBid(props.openDeleteBid);
            }}
          >
            Yes
          </button>
          <button onClick={props.onClose} className="button">
            No
          </button>
          <button onClick={props.onClose} className="button">
            Exit
          </button>
          {/* meantime until I figure out how to close after user presses 'Yes' */}
        </div>
      </div>
    </div>
  );
};

export default DeleteBid;
