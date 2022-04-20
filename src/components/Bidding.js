import React from "react";
import "../css/switchStyle.css";
import cx from "classnames"; // joins classNames

const Bidding = ({rounded = true, onChange, checked}) => {
  const sliderCX = cx("slider", {
    rounded: rounded,
  });

  return (
    <label className="switch-bidding">
      <input
        type="checkbox"
        onChange={() => onChange(checked, !checked.bidding)}
        checked={checked.bidding}
      />
      <span className={sliderCX}></span>
      <p style={{textAlign: "right", fontSize: "25px"}}>
        Bidding:{checked.bidding ? "Yes" : "No"}
      </p>
    </label>
  );
};

export default Bidding;
