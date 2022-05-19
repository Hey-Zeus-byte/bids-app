import React from "react";
import "../css/Bids.css";

const MoreJobInfo = (props) => {
  if (!props.moreInfoBid) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">Job Information</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Project Type</th>
              <th>Type of Wage</th>
              <th>Construction Type</th>
              <th>Floor System</th>
              <th>Roof System</th>
            </tr>
          </thead>
          <tbody key={props.moreInfoBid.id}>
            <tr>
              <td>{props.moreInfoBid.projectType}</td>
              <td>{props.moreInfoBid.wageType}</td>
              <td>{props.moreInfoBid.constructType}</td>
              <td>{props.moreInfoBid.floorSystem}</td>
              <td>{props.moreInfoBid.roofSystem}</td>
            </tr>
          </tbody>
        </table>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreJobInfo;
