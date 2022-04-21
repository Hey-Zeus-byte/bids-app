import React from "react";
import "../css/switchStyle.css";
import cx from "classnames"; // joins classNames

const BiddingSwitch = ({rounded = true, onChange, checked}) => {
  const sliderCX = cx("slider", {
    rounded: rounded,
  });

  return (
    <label className="switch-bidding">
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className={sliderCX}></span>
      <p style={{textAlign: "right", fontSize: "25px"}}>
        Bidding:{checked ? "Yes" : "No"}
      </p>
    </label>
  );
};

export default BiddingSwitch;
