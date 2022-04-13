import React from "react";
import "./switchStyle.css";
import cx from "classnames";

const Switch = ({rounded = false, isToggled, onToggle, isToggledId, value}) => {
  const sliderCX = cx("slider", {
    rounded: rounded,
  });

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isToggled}
        onChange={onToggle}
        bidId={isToggledId}
        value={value}
      />
      <span className={sliderCX}>Sent?</span>
    </label>
  );
};

export default Switch;
