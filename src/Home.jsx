import {useState, useEffect} from "react";
import moment from "moment";
import "./Home.css";
import {db} from "./firebase-config";
import {deleteDoc, doc, getDocs, collection} from "firebase/firestore";
import ModalUpdate from "./ModalUpdate";
import ModalCreate from "./ModalCreate";
import img from "./logo/GSCFINC.jpg";
import {useNavigate} from "react-router-dom";
import bids from "./mock-data.json";
import Switch from "./Switch";

function Home() {
  const navigate = useNavigate();
  // const [bids, setBids] = useState([]);
  const [selectedIdSwitch, setSelectedIdSwitch] = useState(); // for switch checkbox

  const bidsCollectionRef = collection(db, "bids");

  const [selectedId, setSelectedId] = useState(); // for update modal
  const [showCreate, setShowCreate] = useState(false); // for create modal

  const deleteBid = async (id) => {
    const bidDoc = doc(db, "bids", id);
    await deleteDoc(bidDoc);
    console.log("Deleted post data from id: " + id);
  };

  // useEffect(() => {
  //   const getBids = async () => {
  //     const data = await getDocs(bidsCollectionRef);
  //     const items = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
  //     setBids(items);
  //   };

  //   getBids();
  // }, [bidsCollectionRef]);

  return (
    <div className="app-container">
      <img src={img} alt="logo" />
      <button
        onClick={() => {
          setShowCreate(true);
        }}
        id="create-modal"
      >
        Create Bid
      </button>
      <ModalCreate
        onClose={() => setShowCreate(false)}
        showCreate={showCreate}
      />
      <ModalUpdate
        onClose={() => setSelectedId(null)}
        selectedId={selectedId}
      />
      <button
        onClick={() => {
          navigate("/change_order_log");
        }}
        className="change-order"
      >
        Change Order Logs
      </button>
      <table>
        <thead>
          <tr>
            <th>Options</th>
            <th>Job Name</th>
            <th>General Contractor</th>
            <th>City</th>
            <th>Date Posted</th>
            <th>Project Type</th>
            <th>Type of Wage</th>
            <th>Construction Type</th>
            <th>Floor System</th>
            <th>Roof System</th>
            <th>Due Date</th>
            <th>Days Left</th>
            <th>Date Sent</th>
          </tr>
        </thead>
        {bids.map((bid) => {
          return (
            <tbody key={bid.id}>
              <tr>
                <div className="options-container">
                  <button
                    onClick={() => {
                      deleteBid(bid.id);
                    }}
                    id="delete-button"
                  >
                    Delete Bid
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(bid.id);
                    }}
                    id="update-button"
                  >
                    Update Bid
                  </button>
                  <div>
                    <Switch
                      onToggle={() => {
                        setSelectedIdSwitch(bid.id);
                      }}
                      selectedIdSwitch={selectedIdSwitch}
                    />
                  </div>
                </div>
                <td>{bid.jobName}</td>
                <td>{bid.generalContractor}</td>
                <td>{bid.city}</td>
                <td>{moment(bid.date).calendar()}</td>
                <td>{bid.projectType}</td>
                <td>{bid.wageType}</td>
                <td>{bid.constructType}</td>
                <td>{bid.floorSystem}</td>
                <td>{bid.roofSystem}</td>
                <td>{moment(bid.dueDate).calendar()}</td>
                <td>{bid.daysLeft}</td>
                {/* this will be the difference between date posted and deadline */}
                <td>{moment(bid.dateSent).calendar()}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <h4 id="bottom">Created By: Jesus Valdez</h4>
    </div>
  );
}

export default Home;
