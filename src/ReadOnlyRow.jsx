import React from "react";

const ReadOnlyRow = ({bid, handleEditClick, handleDeleteClick}) => {
  return (
    <tr>
      <td>{bid.date}</td>
      <td>{bid.generalContractor}</td>
      <td>{bid.jobName}</td>
      <td>{bid.dueDate}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, bid)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(bid.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
