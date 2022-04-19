import {useState, useEffect} from "react";
import moment from "moment";
import "../css/Home.css";
import {db} from "../utils/firebase-config";
import {
  deleteDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import ModalUpdate from "../components/ModalUpdate";
import ModalCreate from "../components/ModalCreate";
import img from "../logo/GSCFINC.jpg";
import {useNavigate} from "react-router-dom";
import bids from "../mock-data.json";
import Switch from "../components/Switch";

function Home() {
  const navigate = useNavigate();
  // const [bids, setBids] = useState([]);
  const [sent, setSent] = useState(false); // created entity always defaults to "false" => ModalCreate

  const bidsCollectionRef = collection(db, "bids");

  const [selectedBid, setSelectedBid] = useState(); // for update modal
  const [showCreate, setShowCreate] = useState(false); // for create modal

  const deleteBid = async (id) => {
    console.log("Deleted Bid ID: " + id);
    const bidDoc = doc(db, "bids", id);
    await deleteDoc(bidDoc);
    console.log("Deleted post data from id: " + id);
  };

  const updateSent = async (bid) => {
    // e.preventDefault();
    console.log("Update Sent Succesful! Bid ID: " + bid.id);
    console.log(bid.sent);
    const bidDoc = doc(db, "bids", bid.id);
    setSent(true);
    await updateDoc(bidDoc, {
      sent: sent,
    }).catch((err) => {
      alert(err);
      console.error(err);
    });
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
        onClose={() => setSelectedBid(null)}
        selectedBid={selectedBid}
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
                      setSelectedBid(bid);
                    }}
                    id="update-button"
                  >
                    Update Bid
                  </button>
                  <div>
                    <Switch checked={bid} onChange={updateSent} />
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
