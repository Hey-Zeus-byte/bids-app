import {useState, useEffect} from "react";
import moment from "moment";
import "./App.css";
import {db} from "./firebase-config";
import {deleteDoc, doc, getDocs, collection} from "firebase/firestore";
import ModalUpdate from "./ModalUpdate";
import ModalCreate from "./ModalCreate";

function App() {
  const [bids, setBids] = useState([]);

  const bidsCollectionRef = collection(db, "bids");

  const [show, setShow] = useState(false); // for update modal
  const [showCreate, setShowCreate] = useState(false); // for create modal

  // const state = {checked: false};

  // const handleCheckboxChange = (event) => {
  //   this.setState({checked: event.target.checked});
  // };

  const deleteBid = async (id) => {
    const bidDoc = doc(db, "bids", id);
    await deleteDoc(bidDoc);
  };

  useEffect(() => {
    const getBids = async () => {
      const data = await getDocs(bidsCollectionRef);
      const items = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setBids(items);
    };

    getBids();
  }, [bidsCollectionRef]);

  return (
    <div className="app-container">
      <h1>GSCF Bids List</h1>
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
      {/* could pass the bid.id inside ModalCreate, same as UpdateModal */}
      <table>
        <thead>
          <tr>
            <th>Bidding</th>
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
                <input type="checkbox" name="bidding" />
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
                <td>{moment(bid.dateSent).calendar()}</td>
              </tr>
              <button
                onClick={() => {
                  setShow(true);
                }}
              >
                Update Bid
              </button>
              <ModalUpdate onClose={() => setShow(false)} show={show} bidId={bid.id}/>
              <button
                onClick={() => {
                  deleteBid(bid.id);
                }}
              >
                      {/* could pass the bid.id inside ModalCreate if props doesn't work */}
                Delete Bid
              </button>
            </tbody>
          );
        })}
      </table>
      <h4 id="bottom">Created By: Jesus Valdez</h4>
    </div>
  );
}

export default App;