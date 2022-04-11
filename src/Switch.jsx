import React from "react";
import "./switchStyle.css";
import cx from "classnames";

const Switch = ({rounded = false, isToggled, onToggle}) => {
  const sliderCX = cx("slider", {
    rounded: rounded,
  });

  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={sliderCX}>Sent?</span>
    </label>
  );
};

export default Switch;
