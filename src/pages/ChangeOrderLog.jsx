import React from "react";
import "../css/Bids.css";
import {useNavigate} from "react-router-dom";
import img1 from "../pdfs/389First.pdf";
import img2 from "../pdfs/425First.pdf";
import Amador from "../pdfs/Amador.pdf";
import Burlingame from "../pdfs/Burlingame.pdf";
import Foothill from "../pdfs/Foothill.pdf";
import GraniteRidge from "../pdfs/GraniteRidge.pdf";
import Patel from "../pdfs/Patel.pdf";
import VSS from "../pdfs/VirginiaStreetStudios.pdf";

const ChangeOrderLog = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{color: "red", fontSize: "50px"}}>In the works...</h1>
      <h1 style={{color: "brown", textAlign: "center", fontSize: "80px"}}>
        Change Order Logs
      </h1>
      <button
        onClick={() => {
          navigate("/bids_list");
        }}
        id="button"
        style={{fontSize: "20px"}}
      >
        Go back to bid list
      </button>
      <div className="iframe-container">
        <h1 style={{textAlign: "center", fontSize: "50px"}}>389 First</h1>
        <iframe
          style={{width: "95%", height: "800px"}}
          src={img1}
          title="389"
        />

        <h1 style={{textAlign: "center", fontSize: "50px"}}>425 First</h1>
        <iframe
          src={img2}
          style={{width: "95%", height: "700px"}}
          title="425"
        />

        <h1 style={{textAlign: "center", fontSize: "50px"}}>Amador</h1>
        <iframe
          src={Amador}
          style={{width: "95%", height: "700px"}}
          title="amador"
        />

        <h1 style={{textAlign: "center", fontSize: "50px"}}>Burlingame</h1>
        <iframe
          src={Burlingame}
          style={{width: "95%", height: "700px"}}
          title="burlingame"
        />

        <h1 style={{textAlign: "center", fontSize: "50px"}}>Foothill</h1>
        <iframe
          src={Foothill}
          style={{width: "95%", height: "700px"}}
          title="foothill"
        />

        <h1 style={{textAlign: "center", fontSize: "50px"}}>Granite Ridge</h1>
        <iframe
          src={GraniteRidge}
          style={{width: "95%", height: "700px"}}
          title="graniteridge"
        />

        <h1 style={{textAlign: "center", fontSize: "50px"}}>Patel Residence</h1>
        <iframe
          src={Patel}
          style={{width: "95%", height: "700px"}}
          title="patel"
        />

        <h1 style={{textAlign: "center", fontSize: "50px"}}>
          Virginia Street Studios
        </h1>
        <iframe src={VSS} style={{width: "95%", height: "700px"}} title="VSS" />
      </div>
    </div>
  );
};

export default ChangeOrderLog;
