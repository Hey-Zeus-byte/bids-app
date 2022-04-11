import React from "react";
import {useNavigate} from "react-router-dom";

const ChangeOrderLog = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>In the works...</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="change-order"
      >
        Go back to bid list
      </button>
    </div>
  );
};

export default ChangeOrderLog;
