import React from "react";
import "./Home.css";
import {useNavigate} from "react-router-dom";
import img1 from "./pdfs/389First.pdf";
import img2 from "./pdfs/425First.pdf";
import Amador from "./pdfs/Amador.pdf";
import Burlingame from "./pdfs/Burlingame.pdf";
import Foothill from "./pdfs/Foothill.pdf";
import GraniteRidge from "./pdfs/GraniteRidge.pdf";
import Patel from "./pdfs/Patel.pdf";
import VSS from "./pdfs/VirginiaStreetStudios.pdf";

const ChangeOrderLog = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{color: "red"}}>In the works...</h1>
      <h1 style={{color: "brown"}}>Change Order Logs</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
        id="create-modal"
      >
        Go back to bid list
      </button>
      <div>
        <h1>389 First</h1>
        <iframe
          style={{width: "800px", height: "666px"}}
          src={img1}
          sandbox=""
          title="389"
          type="application/pdf"
        />

        <h1>425 First</h1>
        <iframe
          src={img2}
          sandbox=""
          style={{width: "800px", height: "666px"}}
          title="425"
        />

        <h1>Amador</h1>
        <iframe
          src={Amador}
          sandbox=""
          style={{width: "800px", height: "666px"}}
          title="amador"
        />

        <h1>Burlingame</h1>
        <iframe
          src={Burlingame}
          sandbox=""
          style={{width: "800px", height: "666px"}}
          title="burlingame"
        />

        <h1>Foothill</h1>
        <iframe
          src={Foothill}
          sandbox=""
          style={{width: "800px", height: "666px"}}
          title="foothill"
        />

        <h1>Granite Ridge</h1>
        <iframe
          src={GraniteRidge}
          sandbox=""
          style={{width: "800px", height: "666px"}}
          title="graniteridge"
        />

        <h1>Patel Residence</h1>
        <iframe
          src={Patel}
          sandbox=""
          style={{width: "800px", height: "666px"}}
          title="patel"
        />

        <h1>Virginia Street Studios</h1>
        <iframe
          src={VSS}
          sandbox=""
          style={{width: "800px", height: "666px"}}
          title="VSS"
        />
      </div>
    </div>
  );
};

export default ChangeOrderLog;
