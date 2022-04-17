import React, {useState} from "react";
import "./switchStyle.css";
import cx from "classnames"; // joins classNames

const Switch = ({rounded = true, onToggle, selectedIdSwitch}) => {
  const sliderCX = cx("slider", {
    rounded: rounded,
  });

  const [markedSent, setMarkedSent] = useState(null);
  if (selectedIdSwitch) {
    setMarkedSent(selectedIdSwitch);
  }

  return (
    <label className="switch">
      <input type="checkbox" onChange={onToggle} />
      <span className={sliderCX}></span>
      <p style={{textAlign: "center", fontSize: "25px"}}>Sent?</p>
      <p style={{fontSize: "20px"}}>{markedSent ? "Yes" : "No"}</p>
    </label>
  );
};

export default Switch;
