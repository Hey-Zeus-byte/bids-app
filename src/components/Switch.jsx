import React from "react";
import "../css/switchStyle.css";
import cx from "classnames"; // joins classNames

const Switch = ({rounded = true, onChange, checked}) => {
  const sliderCX = cx("slider", {
    rounded: rounded,
  });

  return (
    <label className="switch-sent">
      <input
        type="checkbox"
        onChange={() => onChange(checked, !checked.sent)}
        checked={checked.sent}
      />
      <span className={sliderCX}></span>
      <p style={{textAlign: "center", fontSize: "25px"}}>
        Sent:{checked.sent ? "Yes" : "No"}
      </p>
    </label>
  );
};

export default Switch;
