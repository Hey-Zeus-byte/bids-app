import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
      <input
          type="date"
          required="required"
          placeholder="Post Date..."
          name="date"
          value={editFormData.date}
          onChange={handleEditFormChange}
        /></td>
        <td>
        <input
          type="string"
          required="required"
          placeholder="General Contractor..."
          name="generalContractor"
          value={editFormData.generalContractor}
          onChange={handleEditFormChange}
        /></td>
        <td>
        <input
          type="string"
          required="required"
          placeholder="Job Name..."
          name="jobName"
          value={editFormData.jobName}
          onChange={handleEditFormChange}
        /></td>
        <td><input
          type="date"
          required="required"
          placeholder="Due Date..."
          name="dueDate"
          value={editFormData.dueDate}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
